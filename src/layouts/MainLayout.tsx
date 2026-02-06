
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import type { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
   <Box
  minHeight="100vh"
  display="flex"
  justifyContent="center"
  alignItems="center"
  px={{ xs: 2, sm: 4 }}
  py={4}
>
  <Container maxWidth="md">
    {children}
  </Container>
</Box>
  );
};

export default MainLayout;