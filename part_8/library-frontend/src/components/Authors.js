import { useMutation, useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHORS } from "../queries/authors";
import { useMemo, useState } from "react";
import Select from "react-select";
const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS).data?.allAuthors;
  const [year, setYear] = useState("");
  const [updateAuthor] = useMutation(EDIT_AUTHORS, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (err) => {
      const error = err.graphQLErrors[0].message;
      props.setError(error);
    },
  });

  const options = useMemo(
    () =>
      authors
        ? authors.map((author) => ({
            value: author.name,
            label: author.name,
          }))
        : [],
    [authors]
  );
  const [selectedOption, setSelectedOption] = useState();

  if (!props.show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    updateAuthor({
      variables: {
        name: selectedOption.value,
        setBornTo: parseInt(year),
      },
    });
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors &&
            authors.map((a) => (
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
          <Select onChange={setSelectedOption} options={options} />
        </div>
        <div>
          <label>born</label>
          <input
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Authors;
