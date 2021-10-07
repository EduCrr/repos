import React, { useEffect, useState } from "react";
import {
  Container,
  Owner,
  Loading,
  BackButton,
  IssuesList,
  Page,
  Btns,
} from "./style";
import api from "../../Service/api";
import { FaArrowLeft } from "react-icons/fa";
import { useHistory } from "react-router-dom";

export default function Repositorio({ match }) {
  const [repositorios, setRepositorios] = useState({});
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState([
    { state: "all", name: "Todos", active: true },
    { state: "open", name: "Abertos", active: false },
    { state: "closed", name: "Fechados", active: false },
  ]);
  const [filtersIndex, setFiltersIndex] = useState(0);

  let history = useHistory();

  useEffect(() => {
    async function load() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);

      const [repositorioData, issuesData] = await Promise.all([
        api.get(`/repos/${nomeRepo}`),
        api.get(`/repos/${nomeRepo}/issues`, {
          params: {
            state: filters.find((item) => item.active).state,
            per_page: 7,
          },
        }),
      ]);
      setRepositorios(repositorioData.data);
      setIssues(issuesData.data);
      setLoading(false);
    }
    load();
  }, [match.params.repositorio]);

  useEffect(() => {
    async function LoadIssue() {
      const nomeRepo = decodeURIComponent(match.params.repositorio);
      const response = await api.get(`/repos/${nomeRepo}/issues`, {
        params: {
          state: filters[filtersIndex].state,
          per_page: 7,
          page,
        },
      });
      setIssues(response.data);
    }
    LoadIssue();
  }, [match.params.repositorio, page, filters, filtersIndex]);

  function handlePage(action) {
    setPage(action === "back" ? page - 1 : page + 1);
  }

  function handleFilter(index) {
    setFiltersIndex(index);
    setPage(1);
  }

  if (loading) {
    return (
      <Loading>
        <h2>Carregando...</h2>
      </Loading>
    );
  }

  return (
    <Container>
      <BackButton onClick={() => history.push("/")}>
        <FaArrowLeft color="white" size={20} />
      </BackButton>
      <Owner>
        <img
          src={repositorios.owner.avatar_url}
          alt={repositorios.owner.login}
        />
        <h1>{repositorios.name}</h1>
        <p>{repositorios.description}</p>
        <Btns active={filtersIndex}>
          {filters.map((item, k) => (
            <button
              key={item.state}
              type="button"
              onClick={() => handleFilter(k)}
            >
              {item.name}
            </button>
          ))}
        </Btns>
      </Owner>
      <IssuesList>
        {issues.map((item) => (
          <li key={String(item.id)}>
            <img src={item.user.avatar_url} alt={item.user.login} />
            <div>
              <strong>
                <a href={item.html_url}>{item.title}</a>
              </strong>

              <strong>
                {item.labels.map((label) => (
                  <span style={{ margin: "5px 0px" }} key={String(label.id)}>
                    {label.name}
                  </span>
                ))}
              </strong>
              <p>{item.user.login}</p>
            </div>
          </li>
        ))}
      </IssuesList>
      <Page>
        <button
          type="button"
          disabled={page < 2}
          onClick={() => handlePage("back")}
        >
          Voltar
        </button>
        <button type="button" onClick={() => handlePage("next")}>
          Proxima
        </button>
      </Page>
    </Container>
  );
}
