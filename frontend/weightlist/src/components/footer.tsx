import {Box, Container} from "@mui/material";

export default function Footer() {
  return (
    <footer>
      <Container maxWidth="xl">
        <Box
          display="flex"
          flexDirection="column"
          gap="20px"
          justifyContent="center"
          alignItems="center"
        >
          <span>Designed and developed by <a href="burwellwebdesigns.com">Burwell Web Designs, LLC</a>.</span>
          <span>Copyright 2024</span>
        </Box>
      </Container>
    </footer>
  )
}