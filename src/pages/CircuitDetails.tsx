
import { useParams, Link } from "react-router-dom";
import { useCircuits } from "@/hooks/useCircuits";
import { Card, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { ChevronLeft, Globe, History } from "lucide-react";
import { useWikipediaSummary } from "@/hooks/useWikipediaSummary";

const CircuitDetails = () => {
  const { circuitId } = useParams<{ circuitId: string }>();
  const { data: circuits = [] } = useCircuits("2025");

  const circuit = circuits.find((c: any) => c.circuitId === circuitId);

  // Try to match Wikipedia page title
  const wikipediaTitle = circuit?.circuitName;

  const {
    data: wikipedia,
    isLoading: wikiLoading,
    error: wikiError,
  } = useWikipediaSummary(wikipediaTitle);

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
          <div className="mt-6 space-y-6">
            <div>
              <h2 className="font-semibold mb-2 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Overview
              </h2>
              {wikiLoading && (
                <div className="text-muted-foreground">Loading information…</div>
              )}
              {!wikiLoading && wikiError && (
                <div className="text-destructive">No Wikipedia info found.</div>
              )}
              {!wikiLoading && wikipedia?.summary && (
                <div className="mb-2 text-base text-muted-foreground">{wikipedia.summary}</div>
              )}
            </div>

            {wikipedia?.history && (
              <div>
                <h2 className="font-semibold mb-2 flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  History
                </h2>
                <div className="text-base text-muted-foreground">{wikipedia.history}</div>
              </div>
            )}

            {!wikiLoading && wikipedia?.url && (
              <a
                href={wikipedia.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
              >
                <Globe className="mr-2 w-4 h-4" />
                View on Wikipedia
              </a>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CircuitDetails;
