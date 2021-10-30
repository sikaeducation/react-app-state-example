function FormInput({
  pattern,
  type,
  slug,
  label,
  isRequired,
  placeholder,
  value,
  changeHandler,
}) {

  return (
    <>
      <label htmlFor={slug}>{label}</label>
      <input
        id={slug}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={changeHandler}
        pattern={pattern}
        required={isRequired}
      />
    </>
  );
}

export default FormInput;
