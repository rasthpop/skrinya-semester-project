import { useParams } from "react-router-dom";

const gatherings = [
  {
    id: 1,
    title: "Save the Forests",
    description: "Help us protect and restore forests around the world.",
    tags: ["Nature"],
    author: "Alice"
  },
  {
    id: 2,
    title: "Clean Water for All",
    description: "Providing access to clean water in underserved regions.",
    tags: ["Health", "Water"],
    author: "Bob"
  }
];

export default function GatherDetails() {
  const { id } = useParams();
  const gathering = gatherings.find(g => g.id === parseInt(id));

  if (!gathering) return <p>Gathering not found</p>;

  return (
    <div>
      <h2>{gathering.title}</h2>
      <p><strong>Author:</strong> {gathering.author}</p>
      <p><strong>Description:</strong> {gathering.description}</p>
      <p><strong>Tags:</strong> {gathering.tags.join(", ")}</p>
      <button onClick={() => alert("Redirecting to donation...")}>
        Donate
      </button>
    </div>
  );
}
