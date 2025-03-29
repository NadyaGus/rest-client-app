import { Container } from '@mui/material';

export default function Home() {
  return (
    <>
      <Container component={'main'}>
        <h1>Home</h1>
      </Container>
      <Container component={'footer'}>
        <h1>Footer</h1>
      </Container>
    </>
  );
}
