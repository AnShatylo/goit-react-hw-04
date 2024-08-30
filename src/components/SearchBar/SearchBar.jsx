import { Field, Form, Formik } from 'formik';
import css from './SearchBar.module.css';

export default function SearchBar({ onSearch }) {
  return (
    <header className={css.searchHeader}>
        <Formik
      initialValues={{query: ''}}
      onSubmit={(values, actions) => {
        onSearch(values.query);
        actions.resetForm();
      }} 
      >
        <Form className={css.searchForm}>
          <Field
          type="text"
          name="query"
          placeholder="Search images and photos"
          className={css.field}>
          </Field>
          <button type="submit" className={css.submit}>
            Search
          </button>
        </Form>
      </Formik>
    </header>
  );
}
