interface EmailTemplateProps {
  firstName: string;
}

export const EmailTemplate = (props: { firstName: string }) => {
  return (
    <div>
      <h1>Welcome, {props.firstName}!</h1>
    </div>
  );
};
