import React, { useState, useCallback, useEffect } from "react";
import { Container, Form, SubmitButton, List, DeleteButton } from "./style";
import { FaGithub, FaPlus, FaSpinner, FaBars, FaTrash } from "react-icons/fa";
import api from "../../Service/api";
import { Link } from "react-router-dom";

export default function Main() {
  const [newRepo, setNewRepo] = useState("");
  const [repositorios, setRepositorios] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  //buscar
  useEffect(() => {
    let getRepos = localStorage.getItem("repos");
    if (getRepos) {
      setRepositorios(JSON.parse(getRepos));
    }
  }, []);

  //salvar
  useEffect(() => {
    localStorage.setItem("repos", JSON.stringify(repositorios));
  }, [repositorios]);

  function handleinputChange(e) {
    setNewRepo(e.target.value);
    setAlert(false);
    setErrorMsg("");
  }
  function erroMsg(e) {
    setErrorMsg(e);
  }
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      async function submit() {
        setLoading(true);
        setAlert(null);
        try {
          if (newRepo === "") {
            throw new erroMsg("Campo está vazio!");
          }

          const response = await api.get(`repos/${newRepo}`);

          const hasRepo = repositorios.find((item) => item.name === newRepo);
          if (hasRepo) {
            throw new erroMsg("Repositório já existe");
          }

          const data = {
            name: response.data.full_name,
          };
          setRepositorios([...repositorios, data]);
          setNewRepo("");
        } catch (error) {
          console.log(error);
          setAlert(true);
        } finally {
          setLoading(false);
        }
      }
      submit();
    },
    [newRepo, repositorios]
  );

  const handleDelete = useCallback(
    (item) => {
      let find = repositorios.filter((rep) => rep.name !== item);
      setRepositorios(find);
    },
    [repositorios]
  );

  return (
    <Container>
      <h1>
        <FaGithub color="#222" size={25} />
        Meus repositórios
      </h1>

      <Form onSubmit={handleSubmit} error={alert}>
        <input
          value={newRepo}
          onChange={handleinputChange}
          type="text"
          placeholder="Adicionar repositórios"
        />
        <SubmitButton loading={loading ? 1 : 0}>
          {loading ? (
            <FaSpinner color="white" size={14} />
          ) : (
            <FaPlus color="white" size={14} />
          )}
        </SubmitButton>
      </Form>
      {errorMsg !== null && (
        <p style={{ color: "#222", marginTop: "10px" }}>{errorMsg}</p>
      )}
      <List>
        {repositorios.map((item) => (
          <li key={item.name}>
            <span>
              <DeleteButton onClick={() => handleDelete(item.name)}>
                <FaTrash size={14} />
              </DeleteButton>
              {item.name}
            </span>
            <Link to={`/repositorio/${encodeURIComponent(item.name)}`}>
              <FaBars size={20} />
            </Link>
          </li>
        ))}
      </List>
    </Container>
  );
}

//ler https://pt-br.reactjs.org/docs/hooks-intro.html
