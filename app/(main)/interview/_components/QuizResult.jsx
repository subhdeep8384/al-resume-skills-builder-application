"use client";
import React from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const QuizResult = ({ resultData, onStartNew }) => {
  if (!resultData) return null;

  const correctCount = resultData.questions.filter(q => q.isCorrect).length;
  const total = resultData.questions.length;

  return (
    <div className="max-w-3xl mx-auto mt-10 space-y-6">
      <Card className="p-4 shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Quiz Results
          </CardTitle>
        </CardHeader>

        <CardContent className="text-center space-y-2">
          <p className="text-lg font-semibold">
            Category: <span className="text-blue-600">{resultData.category}</span>
          </p>
          <p className="text-xl font-bold">
            Score: {correctCount} / {total}
          </p>
          <p className="text-green-600 italic">{resultData.improvementTip}</p>
        </CardContent>

        <CardFooter className="flex justify-center">
          <Button onClick={onStartNew}>Start New Quiz</Button>
        </CardFooter>
      </Card>

      <div className="space-y-4">
        {resultData.questions.map((q, index) => (
          <Card key={index} className="p-4">
            <CardHeader>
              <CardTitle className="text-base font-semibold">
                Q{index + 1}. {q.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-1">
              <p>
                <strong>Your Answer:</strong> {q.userAnser}
              </p>
              <p>
                <strong>Correct Answer:</strong> {q.answer}
              </p>
              <p
                className={`font-semibold ${
                  q.isCorrect ? "text-green-600" : "text-red-600"
                }`}
              >
                {q.isCorrect ? "✅ Correct" : "❌ Incorrect"}
              </p>
              <p className="text-sm text-gray-600">{q.explanation}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizResult;
