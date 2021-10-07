import styled, { keyframes, css } from "styled-components";

export const Container = styled.div`
  max-width: 700px;
  background-color: white;
  border-radius: 4px;
  padding: 30px;
  margin: 80px auto; //center
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  h1 {
    color: #222;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;

    svg {
      margin-right: 10px;
    }
  }
`;
export const Form = styled.form`
  margin-top: 30px;
  display: flex;
  flex-direction: row;

  input {
    flex: 1;
    color: #222;
    border: 1px solid ${(props) => (props.error ? "red" : "#ddd")};
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 17px;
  }
`;

//animation
const animate = keyframes`
    from{
        transform: rotate(0deg)
        
    }
    to{
        transform: rotate(360deg)
        
    }
`;
export const SubmitButton = styled.button.attrs((props) => ({
  type: "submit",
  disabled: props.loading,
}))`
  background-color: #0d2636;
  border: 0;
  border-radius: 4px;
  padding: 0 15px;
  display: flex;
  align-items: center;
  justify-content: center;

  &[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
  ${(props) =>
    props.loading &&
    css`
      svg {
        animation: ${animate} 2s linear infinite;
      }
    `}
`;

export const List = styled.ul`
  color: #0d2636;
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    //ignora 1 e add do 2 para baixo
    & + li {
      border-top: 1px solid #eee;
    }

    a {
      color: #0d2636;
      text-decoration: none;
    }
  }
`;
export const DeleteButton = styled.button.attrs({
  type: "button",
})`
  padding: 8px 7px;
  background-color: transparent;
  color: #0d2636;
  border: 0;
  outline: 0;
  border-radius: 4px;
`;
