import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { createUserMutation } from "../sdk/@tanstack/react-query.gen";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);

  const { mutate, isPending, error } = useMutation({
    ...createUserMutation(),
    onSuccess: (_, variables) => {
      console.log("User created:", variables.body);
      setSuccess(true);
      setUsername("");
      setEmail("");
    },
  });

  const handleCreate = () => {
    setSuccess(false);
    mutate({
      body: {
        username,
        email,
      },
    });
  };

  const isEmailValid = email.includes("@");

  return (
    <Box>
      <Card sx={{ width: 420, p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Create User
          </Typography>

          <Typography variant="body2" color="text.secondary" mb={2}>
            Enter user details to create a new account
          </Typography>

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              User created successfully
            </Alert>
          )}

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error.message}
            </Alert>
          )}

          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              disabled={isPending}
            />

            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isPending}
              error={!!email && !isEmailValid}
              helperText={
                email && !isEmailValid ? "Enter a valid email address" : ""
              }
            />

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={handleCreate}
              disabled={
                isPending || !username || !email || !isEmailValid
              }
              sx={{ mt: 1 }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create User"
              )}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateUser;
