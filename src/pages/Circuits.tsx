
import { Link } from "react-router-dom";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useCircuits } from "@/hooks/useCircuits";
import { Loader2 } from "lucide-react";

const Circuits = () => {
  const { data: circuits = [], isLoading, error } = useCircuits("2025");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin" />
        <span className="ml-2">Loading circuits...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center my-16 text-red-500">
        Failed to load circuits. Please try again later.
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold mb-8">2025 F1 Circuits</h1>
      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {circuits.map((circuit) => (
          <Link
            key={circuit.circuitId}
            to={`/circuits/${circuit.circuitId}`}
            className="hover:no-underline"
          >
            <Card className="cursor-pointer hover:shadow-lg transition">
              <CardContent>
                <CardTitle>{circuit.circuitName}</CardTitle>
                <div className="text-muted-foreground mt-1">{circuit.locality}, {circuit.country}</div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Circuits;
