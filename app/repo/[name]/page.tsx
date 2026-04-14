// app/repo/[name]/page.js
export default function RepoPage({ params }) {
    return <h1>Repo: {params.name}</h1>;
}