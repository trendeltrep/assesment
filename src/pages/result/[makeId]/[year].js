
export async function getStaticPaths() {
    // Pre-render only a few pages for now. Adjust as necessary.
    return {
      paths: [], // Leave empty or add some default paths if desired.
      fallback: 'blocking', // Serve 404 if no match is found during build time.
    };
  }
  
  export async function getStaticProps({ params }) {
    const { makeId, year } = params;
    
    // Fetch vehicle models for the given makeId and year
    const response = await fetch(
      `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`
    );
    const data = await response.json();
    const makeName = data.Results[0]?.Make_Name || 'Unknown Make';
    return {
      props: {
        models: data.Results,
        makeName,
        year,
      },
    };
  }
  
  export default function ResultPage({ models, makeName, year }) {
    return (
      <div className="min-h-screen p-6 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">
          Vehicle {makeName} models in Year {year}
        </h1>
        {models.length === 0 ? (
          <p className="text-red-500">No models found for this selection.</p>
        ) : (
          <ul className="space-y-20 space-x-20">
            {models.map((model) => (
              <li key={model.Model_ID} className="p-4 bg-white shadow rounded-md">
                {model.Model_Name}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
  
  