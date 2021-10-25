import React, { useEffect } from "react";
import { Container } from "./styles";
import { fetchTodos, selectTodos, addTodo, STATUS } from "./todosSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  ListGroup,
  ListGroupItem,
  Input,
  Button,
  Spinner,
  Form,
  FormGroup,
  Label,
} from "./styles";
import { useFormik } from "formik";
import * as yup from "yup";

const Todos = () => {
  const dispatch = useDispatch();
  const { status, todos } = useSelector(selectTodos);

  useEffect(() => {
    dispatch(fetchTodos());
    // dispatch(addTodo({ description: "Another description in the todo" }));
  }, []);

  const onSubmit = (data) => {
    dispatch(addTodo(data));
  };

  const validationSchema = yup.object().shape({
    description: yup.string().required("A descrição é obrigatória!"),
  });

  const { values, errors, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema,
    onSubmit,
  });

  return (
    <Container>
      <Form onSubmit={handleSubmit} noValidate>
        <FormGroup>
          <Label for="description">Descrição</Label>
          <Input
            type="text"
            name="description"
            id="description"
            value={values.description}
            placeholder="A fazer"
            onChange={(e) => setFieldValue("description", e.target.value)}
          />
        </FormGroup>
        <Button type="submit">Salvar</Button>
      </Form>
      {status === STATUS.LOADING && <Spinner />}
      {!status !== STATUS.LOADING && (
        <ListGroup>
          {todos?.map((item) => (
            <ListGroupItem key={item._id}>{item.description}</ListGroupItem>
          ))}
        </ListGroup>
      )}
    </Container>
  );
};

export default Todos;
