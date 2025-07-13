import { tests } from "@/lib/data";
import { TestCard } from "@/components/test-card";

export default function Dashboard() {
  const activeTests = tests.filter((test) => test.category === 'active');
  const practiceTests = tests.filter((test) => test.category === 'practice');

  return (
    <div className="container py-8">
      <h1 className="mb-6 font-headline text-4xl font-bold tracking-tight">Dashboard</h1>
      
      {activeTests.length > 0 && (
        <section>
          <h2 className="mb-4 text-2xl font-semibold text-primary">Active Tests</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {activeTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        </section>
      )}

      <section className={activeTests.length > 0 ? "mt-12" : ""}>
        <h2 className="mb-4 text-2xl font-semibold">Practice Library</h2>
        {practiceTests.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {practiceTests.map((test) => (
              <TestCard key={test.id} test={test} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">The practice library is empty. Use the 'Generate Questions' feature to create a new test!</p>
        )}
      </section>
    </div>
  );
}
