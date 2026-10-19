export default function PageHeading({ title, description, action }) {
  return <div className="page-heading"><div><h2>{title}</h2>{description && <p>{description}</p>}</div>{action}</div>;
}