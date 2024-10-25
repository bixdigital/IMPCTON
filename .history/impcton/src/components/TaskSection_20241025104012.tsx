import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Youtube, Twitter, RefreshCw } from 'lucide-react';

interface Task {
  id: string;
  type: 'youtube' | 'twitter' | 'other';
  description: string;
  reward: number;
  completed: boolean;
}

interface TaskSectionProps {
  balance: number;
  setBalance: React.Dispatch<React.SetStateAction<number>>;
}

export default function TaskSection({ balance, setBalance }: TaskSectionProps) { ... }
  const [tasks, setTasks] = useState<Task[]>([
    { id: '1', type: 'youtube', description: 'Watch a video for 5 minutes', reward: 50, completed: false },
    { id: '2', type: 'twitter', description: 'Retweet our latest post', reward: 30, completed: false },
    { id: '3', type: 'other', description: 'Invite a friend', reward: 100, completed: false },
  ]);

  const completeTask = (taskId: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === taskId ? { ...task, completed: true } : task
      )
    );
    const completedTask = tasks.find(task => task.id === taskId);
    if (completedTask) {
      setBalance(prevBalance => prevBalance + completedTask.reward);
    }
  };

  const resetTasks = () => {
    setTasks(prevTasks => 
      prevTasks.map(task => ({ ...task, completed: false }))
    );
  };

  const getTaskIcon = (type: 'youtube' | 'twitter' | 'other') => {
    switch (type) {
      case 'youtube':
        return <Youtube className="h-6 w-6 text-red-500" />;
      case 'twitter':
        return <Twitter className="h-6 w-6 text-blue-400" />;
      default:
        return <CheckCircle className="h-6 w-6 text-green-500" />;
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Daily Tasks</CardTitle>
        <CardDescription>Complete tasks to earn rewards</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {tasks.map(task => (
            <Card key={task.id} className="flex items-center justify-between p-4">
              <div className="flex items-center space-x-4">
                {getTaskIcon(task.type)}
                <div>
                  <p className="font-medium">{task.description}</p>
                  <p className="text-sm text-gray-500">Reward: {task.reward} tokens</p>
                </div>
              </div>
              <Button
                onClick={() => completeTask(task.id)}
                disabled={task.completed}
                variant={task.completed ? "outline" : "default"}
              >
                {task.completed ? 'Completed' : 'Complete'}
              </Button>
            </Card>
          ))}
        </div>
        <Button 
          className="mt-4 w-full"
          onClick={resetTasks}
          variant="outline"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset Tasks
        </Button>
      </CardContent>
    </Card>
  );
}
