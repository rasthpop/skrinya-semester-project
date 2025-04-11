import { Link } from "react-router-dom";

const gatherings = [
  { id: 1, title: "Save the Forests", tags: ["Nature"], author: "Alice" },
  { id: 2, title: "Clean Water for All", tags: ["Health", "Water"], author: "Bob" },
];

export default function GatherList() {
  return (
    <div>
      <h1>Fundraiser Projects</h1>
      {gatherings.map(g => (
        <div key={g.id} style={{ margin: "1rem 0" }}>
          <Link to={`/gathering/${g.id}`}>
            <h3>{g.title}</h3>
          </Link>
          <p>By {g.author}</p>
          <p>Tags: {g.tags.join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
