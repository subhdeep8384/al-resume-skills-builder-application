"use client";
import { generateQuiz, saveQuizResult } from '@/actions/interview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import useFetch from '@/hooks/use-fetch';
import React, { useEffect, useState } from 'react';
import { BarLoader } from 'react-spinners';
import { toast } from 'sonner';
import QuizResult from './QuizResult';

const Quiz = () => {
  const [data, setData] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showExplantion, setShowExplantion] = useState(false);

  const {
    loading: generatingQuiz,
    fn: generateQuizFn,
    data: QuizData,
  } = useFetch(generateQuiz);

  const {
    loading: savingQuiz,
    data : resultData ,
    fn: saveQuizResultFn,
    setData : setResultData ,
  } = useFetch(saveQuizResult);
  console.log("result data is :::::::::::" , resultData)
  useEffect(() => {
    if (QuizData) {
      setData(QuizData);
      setAnswers(new Array(QuizData.length).fill(null));
    }
  }, [QuizData]);

  const handleAnswer = (ans) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = ans;
    setAnswers(newAnswers);
  };

  const calculateScore = () => {
    let correct = 0;
    answers.forEach((ans, index) => {
      if (ans === QuizData[index].correctAnswer) correct++;
    });
    return (correct / answers.length) * 100;
  };

  const finishQuiz = async () => {
    const score = calculateScore();
    console.log("Score is ", score);
    try {
      await saveQuizResultFn(data, answers, score);
      toast.success("Quiz submitted successfully");
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleNext = () => {
    if (answers[currentQuestion] === null) {
      toast.error("Please select an answer before proceeding");
      return;
    }

    if (currentQuestion < data.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setShowExplantion(false);
    } else {
      finishQuiz();
    }
  };

  const startNewQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setShowExplantion(false);
    generateQuizFn();
    setResultData(null)
  }

  if (generatingQuiz) {
    return <BarLoader className='mt-4' width={"100%"} color='gray' />;
  }

  if (!QuizData) {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Are you ready to get your interview questions?</CardTitle>
            <CardDescription>
              <p className='text-muted-foreground'>
                This quiz contains 10 questions specific to your industry and skills. Take your time and choose the best answer for each question.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent></CardContent>
          <Button onClick={generateQuizFn}>Generate Quiz</Button>
        </Card>
      </div>
    );
  }

  if (!data || data.length === 0) return null;

  const question = data[currentQuestion];
  if(resultData){
    return <div className='mx-2'>
       <QuizResult resultData={resultData}  onStartNew={startNewQuiz} />
    </div>
  }

  return (
    <div>
      <Card className='mb-3'>
        <CardHeader>
          <CardTitle>
            Question {currentQuestion + 1} of {data.length}.
          </CardTitle>
        </CardHeader>
        <CardContent className='text-lg font-medium'>
          <div className='mb-7'>{question.question}</div>

          <RadioGroup
            className='space-y-3'
            value={answers[currentQuestion] || ""}
            onValueChange={handleAnswer}
          >
            {question.options.map((option, index) => (
              <div key={index} className='flex items-center gap-3'>
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Label htmlFor={`option-${index}`} className='text-sm font-medium'>
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>

          <CardFooter className="mt-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
  
  <div className="w-full sm:w-auto">
    <Button onClick={() => setShowExplantion((e) => !e)}>
      {showExplantion ? "Hide Explanation" : "Show Explanation"}
    </Button>
  </div>

 
  {showExplantion && (
    <div className="w-full mt-4 sm:mt-0 bg-blue-50 border border-blue-200 rounded-xl p-4 shadow-sm transition-all duration-300 ease-in-out">
      <h4 className="font-semibold text-slate-800 mb-2">Explanation</h4>
      <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
    </div>
  )}

  <div className="w-full sm:w-auto">
    <Button
      onClick={handleNext}
      variant="outline"
      disabled={savingQuiz}
      className="flex items-center gap-2"
    >
      {savingQuiz && <BarLoader width={50} />}
      {currentQuestion < data.length - 1 ? "Next" : "Submit"}
    </Button>
  </div>
</CardFooter>

        </CardContent>
      </Card>
    </div>
    
  );
};

export default Quiz;
