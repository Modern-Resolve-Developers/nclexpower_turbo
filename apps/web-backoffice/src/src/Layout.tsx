import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "react-query";

interface Props {}

export const Layout: React.FC<Props> = ({}) => {
  const theme = createTheme();
  const queryClient = new QueryClient({});

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        {/* Further dev. lower level code for contents. */}
      </QueryClientProvider>
    </ThemeProvider>
  );
};
