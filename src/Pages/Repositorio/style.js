import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const Container = styled.div`
  max-width: 700px;
  background-color: white;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto; //center
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  color: #222;
`;
export const Owner = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 150px;
    border-radius: 20%;
    margin: 20px 0px;
  }
  h2 {
    color: #0d2636;
    font-size: 30px;
  }
  p {
    margin-top: 10px;
    line-height: 1.4;
    max-width: 400px;
  }
`;
export const Btns = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;

  button {
    width: 100px;
    background-color: #999;
    color: white;
    margin: 0px 10px;
    padding: 5px 10px;
    border: 0;
    outline: 0;
    border-radius: 4px;

    &:nth-child(${(props) => props.active + 1}) {
      background-color: #222;
    }
  }
`;
export const BackButton = styled.button`
  background-color: #222;
  padding: 4px 8px;
  border: 0;
  outline: 0;
  border-radius: 4px;
`;

//export const BackButton = styled(Link)`

export const IssuesList = styled.ul`
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid #eee;
  list-style-type: none;

  li {
    display: flex;
    align-items: center;
    padding: 15px 10px;
    & + li {
      margin-top: 12px;
    }
  }

  img {
    height: 55px;
    width: 55px;
    border-radius: 50%;
    border: 2px solid #0d2636;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    flex-direction: column;
    margin-left: 12px;
    p {
      margin-top: 5px;
      color: #222;
      font-size: 12px;
    }
  }
  strong {
    font-size: 15px;
    a {
      text-decoration: none;
      color: #222;
      transition: all 0.2s;

      &:hover {
        transition: all 0.2s;
        color: #0071db;
      }
    }
    span {
      display: inline-block;
      flex-direction: column;
      background-color: #222;
      color: white;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      padding: 4px 8px;
      margin-right: 5px !important;
    }
  }
`;
export const Page = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  button {
    outline: 0;
    border: 0;
    background-color: #222;
    color: white;
    padding: 5px 10px;
    border-radius: 4px;

    &:disabled {
      cursor: not-allowed;
    }
  }
`;
