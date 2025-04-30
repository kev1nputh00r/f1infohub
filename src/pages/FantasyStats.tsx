
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { notify } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import DriverPerformanceTable from '@/components/fantasy/DriverPerformanceTable';
import LoginForm from '@/components/fantasy/LoginForm';
import { NotificationDemo } from '@/components/ui/NotificationDemo';

const FantasyStats = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    notify.success({
      title: "Login Successful",
      description: "You now have access to driver statistics and performance metrics."
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-formula text-center mb-8 text-white">Fantasy F1 Driver Statistics</h1>
        <div className="max-w-md mx-auto">
          <Card className="p-6 bg-f1-gray/20 border border-f1-gray/30">
            <h2 className="text-xl font-formula text-center mb-4 text-white">Login Required</h2>
            <p className="text-gray-300 mb-6 text-center">
              Please login to access detailed driver statistics and performance metrics for making informed fantasy team selections.
            </p>
            <LoginForm onLoginSuccess={handleLoginSuccess} />
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-formula text-white">Fantasy F1 Driver Statistics</h1>
        <Button 
          variant="outline" 
          onClick={() => navigate('/fantasy')}
        >
          Back to Fantasy League
        </Button>
      </div>
      
      <Card className="mb-8 p-6 bg-f1-gray/20 border border-f1-gray/30">
        <h2 className="text-xl font-formula mb-4 text-white">Notification System Demo</h2>
        <p className="text-gray-300 mb-4">
          Click the buttons below to see different types of notifications in action.
        </p>
        <NotificationDemo />
      </Card>
      
      <DriverPerformanceTable />
      
      {/* New back to home button */}
      <div className="mt-8 flex justify-center">
        <Button 
          variant="secondary" 
          onClick={() => navigate('/')}
          className="w-full max-w-md"
        >
          <ArrowLeft className="mr-2" /> Back to Home
        </Button>
      </div>
    </div>
  );
};

export default FantasyStats;
