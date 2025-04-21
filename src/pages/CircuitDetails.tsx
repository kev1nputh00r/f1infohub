
import { useParams, Link } from "react-router-dom";
import { useCircuits } from "@/hooks/useCircuits";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft } from "lucide-react";

const CircuitDetails = () => {
  const { circuitId } = useParams<{ circuitId: string }>();
  const { data: circuits = [] } = useCircuits("2025");

  const circuit = circuits.find((c: any) => c.circuitId === circuitId);

  if (!circuit) {
    return (
      <div className="flex flex-col items-center mt-20">
        <div className="text-xl text-center mb-4">Circuit not found</div>
        <Link to="/circuits" className="text-f1-red hover:underline flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Circuits
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12">
      <Link
        to="/circuits"
        className="mb-4 inline-flex items-center text-f1-red hover:underline"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Circuits
      </Link>
      <Card>
        <CardContent className="py-8">
          <CardTitle className="mb-4">{circuit.circuitName}</CardTitle>
          <CardDescription>
            <div>
              <span className="font-medium">Country: </span>
              {circuit.country}
            </div>
            <div>
              <span className="font-medium">Locality: </span>
              {circuit.locality}
            </div>
            <div>
              <span className="font-medium">Circuit ID: </span>
              {circuit.circuitId}
            </div>
          </CardDescription>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitDetails;
