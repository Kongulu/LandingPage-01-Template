export default function Conclusion() {
  return (
    <div className="bg-green-50 border-l-4 border-green-500 p-5 rounded-md mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Benefits of This Approach</h2>
      <ul className="list-disc list-inside space-y-2 text-gray-700">
        <li>Each project has its own codebase and deployment</li>
        <li>Projects can be managed independently</li>
        <li>Better separation of concerns for different functionalities</li>
        <li>Ability to scale each service independently</li>
        <li>You can create additional Replit projects and link them from your main Node12.com domain as you develop more microservices</li>
      </ul>
    </div>
  );
}
