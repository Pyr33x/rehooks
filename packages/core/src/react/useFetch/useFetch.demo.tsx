import { useFetch } from "./index";

type User = {
  id: number;
  name: string;
  email: string;
};

type ApiError = {
  message: string;
};

function Component() {
  const { data, error, isPending, isSuccess, isError, refetch } = useFetch<
    User[],
    ApiError
  >("https://jsonplaceholder.typicode.com/users", {
    method: "GET",
  });

  return (
    <div>
      <h1>User List</h1>

      {isPending && <p>Loading...</p>}
      {isError && error && (
        <p style={{ color: "red" }}>Error: {error.message}</p>
      )}
      {isSuccess && data && (
        <ul>
          {data.map((user: User) => (
            <li key={user.id}>
              {user.name} - {user.email}
            </li>
          ))}
        </ul>
      )}

      <button onClick={refetch} disabled={isPending}>
        {isPending ? "Fetching..." : "Refetch Data"}
      </button>
    </div>
  );
}
