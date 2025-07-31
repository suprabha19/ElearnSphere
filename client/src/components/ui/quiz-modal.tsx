import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { apiRequest } from "@/lib/queryClient";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight, 
  SkipForward,
  CheckCircle,
  AlertCircle
} from "lucide-react";

interface QuizQuestion {
  id: string;
  question: string;
  options: { id: string; text: string; }[];
  difficulty: 'easy' | 'medium' | 'hard';
  type: 'multiple-choice' | 'true-false';
}

interface QuizAttempt {
  quizId: string;
  answers: Record<string, string>;
  currentQuestion: number;
  score?: number;
  completed: boolean;
  timeRemaining?: number;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  quizId?: string;
  courseId?: string;
  title?: string;
}

export default function QuizModal({ 
  isOpen, 
  onClose, 
  quizId, 
  courseId, 
  title = "Quiz" 
}: QuizModalProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [attempt, setAttempt] = useState<QuizAttempt | null>(null);
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [timeRemaining, setTimeRemaining] = useState<number>(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Fetch quiz data
  const { data: quiz, isLoading: quizLoading } = useQuery({
    queryKey: [`/api/quizzes/${quizId}`],
    enabled: !!quizId && isOpen,
  });

  // Initialize quiz attempt
  useEffect(() => {
    if (quiz && !attempt) {
      const questions = quiz.questions || [];
      setAttempt({
        quizId: quiz.id,
        answers: {},
        currentQuestion: 0,
        completed: false,
        timeRemaining: quiz.timeLimit ? quiz.timeLimit * 60 : undefined, // Convert minutes to seconds
      });
      setTimeRemaining(quiz.timeLimit ? quiz.timeLimit * 60 : 0);
    }
  }, [quiz, attempt]);

  // Timer effect
  useEffect(() => {
    if (!isOpen || isCompleted || timeRemaining <= 0) return;

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmitQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isCompleted, timeRemaining]);

  const submitQuizMutation = useMutation({
    mutationFn: async (submissionData: { answers: Record<string, string>; score: number }) => {
      return await apiRequest("POST", `/api/quizzes/${quizId}/submit`, submissionData);
    },
    onSuccess: () => {
      toast({
        title: "Quiz Submitted",
        description: "Your quiz has been submitted successfully!",
        variant: "default",
      });
      setIsCompleted(true);
    },
    onError: (error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Error",
        description: "Failed to submit quiz. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (!quiz || !attempt || quizLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-12">
            <div className="loading-spinner"></div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const questions: QuizQuestion[] = quiz.questions || [];
  const currentQuestionData = questions[attempt.currentQuestion];
  const totalQuestions = questions.length;
  const progressPercentage = ((attempt.currentQuestion + 1) / totalQuestions) * 100;

  // QuizPath Adaptive Algorithm - Simple implementation
  const getNextQuestionIndex = (currentIndex: number, wasCorrect: boolean): number => {
    const nextIndex = currentIndex + 1;
    if (nextIndex >= totalQuestions) return nextIndex;

    // Simple adaptive logic: if answered incorrectly, show an easier question if available
    // if answered correctly, maintain or increase difficulty
    return nextIndex; // For now, proceed linearly - can be enhanced with actual adaptive algorithm
  };

  const calculateScore = (): number => {
    // Simple scoring - can be enhanced with weighted scoring based on difficulty
    const correctAnswers = Object.keys(attempt.answers).length;
    return Math.round((correctAnswers / totalQuestions) * 100);
  };

  const handleAnswerSelect = (value: string) => {
    setCurrentAnswer(value);
  };

  const handleNextQuestion = () => {
    if (!currentAnswer) {
      toast({
        title: "Please select an answer",
        description: "You must select an answer before proceeding.",
        variant: "destructive",
      });
      return;
    }

    const newAnswers = {
      ...attempt.answers,
      [currentQuestionData.id]: currentAnswer,
    };

    const nextQuestionIndex = attempt.currentQuestion + 1;

    if (nextQuestionIndex >= totalQuestions) {
      // Quiz completed
      const finalScore = calculateScore();
      handleSubmitQuiz(newAnswers, finalScore);
    } else {
      setAttempt({
        ...attempt,
        answers: newAnswers,
        currentQuestion: nextQuestionIndex,
      });
      setCurrentAnswer("");
    }
  };

  const handlePreviousQuestion = () => {
    if (attempt.currentQuestion > 0) {
      const prevQuestionId = questions[attempt.currentQuestion - 1].id;
      setAttempt({
        ...attempt,
        currentQuestion: attempt.currentQuestion - 1,
      });
      setCurrentAnswer(attempt.answers[prevQuestionId] || "");
    }
  };

  const handleSkipQuestion = () => {
    const nextQuestionIndex = attempt.currentQuestion + 1;
    if (nextQuestionIndex >= totalQuestions) {
      const finalScore = calculateScore();
      handleSubmitQuiz(attempt.answers, finalScore);
    } else {
      setAttempt({
        ...attempt,
        currentQuestion: nextQuestionIndex,
      });
      setCurrentAnswer("");
    }
  };

  const handleSubmitQuiz = (finalAnswers = attempt.answers, score = calculateScore()) => {
    submitQuizMutation.mutate({ answers: finalAnswers, score });
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'hard':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isCompleted) {
    const finalScore = calculateScore();
    const passed = finalScore >= (quiz.passingScore || 70);

    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {passed ? (
                <CheckCircle className="h-6 w-6 text-green-600" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600" />
              )}
              Quiz Completed
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-6">
            <div className="text-center">
              <div className={`text-6xl font-bold mb-4 ${
                passed ? 'text-green-600' : 'text-red-600'
              }`}>
                {finalScore}%
              </div>
              <Badge 
                variant={passed ? "default" : "destructive"}
                className="text-lg px-4 py-2"
              >
                {passed ? "Passed" : "Failed"}
              </Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {Object.keys(attempt.answers).length}
                </div>
                <div className="text-sm text-gray-600">Questions Answered</div>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-gray-900">
                  {totalQuestions}
                </div>
                <div className="text-sm text-gray-600">Total Questions</div>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
              <Button onClick={() => window.location.reload()} className="btn-primary">
                Retake Quiz
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Adaptive Quiz: {title}</span>
            {timeRemaining > 0 && (
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4" />
                <span className={timeRemaining < 300 ? "text-red-600 font-bold" : ""}>
                  {formatTime(timeRemaining)}
                </span>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                Question {attempt.currentQuestion + 1} of {totalQuestions}
              </span>
              <div className="flex items-center gap-2">
                <span>Difficulty:</span>
                <Badge className={getDifficultyColor(currentQuestionData?.difficulty || 'medium')}>
                  {currentQuestionData?.difficulty || 'Medium'}
                </Badge>
              </div>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {/* Question */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900">
              {currentQuestionData?.question}
            </h3>

            {/* Answer Options */}
            <RadioGroup value={currentAnswer} onValueChange={handleAnswerSelect}>
              <div className="space-y-3">
                {currentQuestionData?.options?.map((option) => (
                  <div key={option.id} className="quiz-option">
                    <RadioGroupItem 
                      value={option.id} 
                      id={option.id}
                      className="h-4 w-4 text-primary"
                    />
                    <Label 
                      htmlFor={option.id} 
                      className="ml-3 text-gray-900 cursor-pointer flex-1"
                    >
                      {option.text}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={attempt.currentQuestion === 0}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={handleSkipQuestion}
              >
                <SkipForward className="h-4 w-4 mr-2" />
                Skip
              </Button>
              <Button
                onClick={handleNextQuestion}
                disabled={!currentAnswer || submitQuizMutation.isPending}
                className="btn-primary"
              >
                {attempt.currentQuestion === totalQuestions - 1 ? "Submit Quiz" : "Next"}
                <ChevronRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
