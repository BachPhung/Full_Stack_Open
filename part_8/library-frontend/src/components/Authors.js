import { useQuery, useMutation } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";
import { useState } from "react";

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });
  const [name, setName] = useState("");
  const [born, setBorn] = useState(0);
  const [modifyAuthor] = useMutation(EDIT_AUTHOR);
  const handleSubmit = (e) => {
    e.preventDefault();
    modifyAuthor({ variables: { name, setBornTo: Number(born) } });
    console.log("Editting author");
    setBorn(0);
    setName("");
  };

  if (!props.show) {
    return null;
  }
  if (authors.loading) {
    return <div>loading...</div>;
  }
  return authors.data ? (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            name
            <select  onChange={(e) => setName(e.target.value)}>
            <option selected disabled hidden>Choose here</option>
              {authors.data.allAuthors.map((a) => (
                <option key={a.name} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div>
          <label>
            born
            <input
              value={born}
              type="number"
              onChange={(e) => setBorn(e.target.value)}
            />
          </label>
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  ) : (
    <div></div>
  );
};
export default Authors;
