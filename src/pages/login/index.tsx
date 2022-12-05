// ** React Imports
import { useState, ReactNode, MouseEvent } from "react";

// ** Next Imports
import Link from "next/link";

// ** MUI Components
import MuiLink from "@mui/material/Link";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import useMediaQuery from "@mui/material/useMediaQuery";
import OutlinedInput from "@mui/material/OutlinedInput";
import { styled, useTheme } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
import InputAdornment from "@mui/material/InputAdornment";
import Typography, { TypographyProps } from "@mui/material/Typography";
import MuiFormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";

// ** Icons Imports
import EyeOutline from "mdi-material-ui/EyeOutline";
import EyeOffOutline from "mdi-material-ui/EyeOffOutline";

// ** Third Party Imports
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Hooks
import { useAuth } from "src/hooks/useAuth";
import useBgColor from "src/@core/hooks/useBgColor";
import { useSettings } from "src/@core/hooks/useSettings";

// ** Configs
import themeConfig from "src/configs/themeConfig";

// ** Layout Import
import BlankLayout from "src/@core/layouts/BlankLayout";

// ** Demo Imports
import FooterIllustrationsV2 from "src/views/pages/auth/FooterIllustrationsV2";
import FooterContent from "src/@core/layouts/components/shared-components/footer/FooterContent";

// ** Styled Components
const LoginIllustrationWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  padding: theme.spacing(20),
  paddingRight: "0 !important",
  [theme.breakpoints.down("lg")]: {
    padding: theme.spacing(10),
  },
}));

const LoginIllustration = styled("img")(({ theme }) => ({
  maxWidth: "48rem",
  [theme.breakpoints.down("xl")]: {
    maxWidth: "38rem",
  },
  [theme.breakpoints.down("lg")]: {
    maxWidth: "30rem",
  },
}));

const RightWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.up("md")]: {
    maxWidth: 400,
  },
  [theme.breakpoints.up("lg")]: {
    maxWidth: 450,
  },
}));

const BoxWrapper = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  [theme.breakpoints.down("md")]: {
    maxWidth: 400,
  },
}));

const TypographyStyled = styled(Typography)<TypographyProps>(({ theme }) => ({
  fontWeight: 600,
  letterSpacing: "0.18px",
  marginBottom: theme.spacing(1.5),
  [theme.breakpoints.down("md")]: { marginTop: theme.spacing(8) },
}));

const FormControlLabel = styled(MuiFormControlLabel)<FormControlLabelProps>(
  ({ theme }) => ({
    "& .MuiFormControlLabel-label": {
      fontSize: "0.875rem",
      color: theme.palette.text.secondary,
    },
  })
);

const schema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().min(5).required(),
});

const defaultValues = {
  password: "",
  username: "",
};

interface FormData {
  username: string;
  password: string;
}

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // ** Hooks
  const auth = useAuth();
  const theme = useTheme();
  const bgClasses = useBgColor();
  const { settings } = useSettings();
  const hidden = useMediaQuery(theme.breakpoints.down("md"));

  // ** Vars
  const { skin } = settings;

  const {
    control,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    const { username, password } = data;
    auth.login({ username, password }, () => {
      setError("username", {
        type: "manual",
        message: "Username or Password is invalid",
      });
    });
  };

  const imageSource =
    skin === "bordered"
      ? "auth-v2-login-illustration-bordered"
      : "auth-v2-login-illustration";

  return (
    <>
      <Box className="content-center" bgcolor="#ffffff" alignItems="center">
        {!hidden ? (
          <Box
            sx={{
              flex: 1,
              display: "flex",
              position: "relative",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <LoginIllustrationWrapper>
              <LoginIllustration
                alt="login-illustration"
                // src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                src={`/images/pln-ilustration.png`}
              />
            </LoginIllustrationWrapper>
            <FooterIllustrationsV2 />
          </Box>
        ) : null}
        <RightWrapper
          sx={
            skin === "bordered" && !hidden
              ? { borderLeft: `1px solid ${theme.palette.divider}` }
              : {}
          }
        >
          <Box
            sx={{
              p: 7,
              marginRight: "20px",
              height: "450px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "background.paper",
              boxShadow: "rgb(76 78 100 / 22%) 0px 2px 10px 0px",
              borderRadius: "10px",
            }}
          >
            <BoxWrapper>
              <Box
                sx={{
                  top: 30,
                  left: 40,
                  display: "flex",
                  position: "absolute",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img src="/images/logo-pln.png" height={30} alt="Logo pln" />
                <Typography
                  variant="h6"
                  sx={{
                    ml: 2,
                    lineHeight: 1,
                    fontWeight: 700,
                    fontSize: "1.5rem !important",
                  }}
                >
                  {themeConfig.templateName}
                </Typography>
              </Box>
              <Box sx={{ mb: 6, textAlign: "center" }}>
                <TypographyStyled variant="h5">Welcome to</TypographyStyled>
                <TypographyStyled
                  variant="h6"
                  fontWeight={100}
                >{`${themeConfig.templateName} ⚡⚡`}</TypographyStyled>
              </Box>
              <form
                noValidate
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                <FormControl fullWidth sx={{ mb: 4 }}>
                  <Controller
                    name="username"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <TextField
                        autoFocus
                        label="Username"
                        value={value}
                        onBlur={onBlur}
                        onChange={onChange}
                        error={Boolean(errors.username)}
                      />
                    )}
                  />
                  {errors.username && (
                    <FormHelperText sx={{ color: "error.main" }}>
                      {errors.username.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <FormControl fullWidth>
                  <InputLabel
                    htmlFor="auth-login-v2-password"
                    error={Boolean(errors.password)}
                  >
                    Password
                  </InputLabel>
                  <Controller
                    name="password"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange, onBlur } }) => (
                      <OutlinedInput
                        value={value}
                        onBlur={onBlur}
                        label="Password"
                        onChange={onChange}
                        id="auth-login-v2-password"
                        error={Boolean(errors.password)}
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? (
                                <EyeOutline />
                              ) : (
                                <EyeOffOutline />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    )}
                  />
                  {errors.password && (
                    <FormHelperText sx={{ color: "error.main" }} id="">
                      {errors.password.message}
                    </FormHelperText>
                  )}
                </FormControl>
                <Box
                  sx={{
                    mb: 4,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                  }}
                >
                  <FormControlLabel
                    label="Remember Me"
                    control={<Checkbox />}
                    sx={{
                      "& .MuiFormControlLabel-label": { color: "text.primary" },
                    }}
                  />
                  <Link passHref href="/forgot-password">
                    <Typography
                      component={MuiLink}
                      variant="body2"
                      sx={{ color: "primary.main" }}
                    >
                      Forgot Password?
                    </Typography>
                  </Link>
                </Box>
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  sx={{ mb: 7 }}
                >
                  Login
                </Button>
              </form>
            </BoxWrapper>
          </Box>
          <Box
            sx={{
              p: 4,
              marginTop: "13px",
              marginRight: "20px",
              textAlign: "center",
              justifyContent: "center",
              backgroundColor: "background.paper",
              boxShadow: "rgb(76 78 100 / 22%) 0px 2px 10px 0px",
              borderRadius: "10px",
            }}
          >
            <Typography color="#155F74" fontWeight={400} variant="subtitle2">
              Seleksi Penghargaan Karya Inovasi (SPKI) Tahun 2023
            </Typography>
            <Typography color="#155F74" fontWeight={700} variant="subtitle1">
              PT. PLN (PERSERO) UP2B JATENG & DIY
            </Typography>
          </Box>
        </RightWrapper>
      </Box>
    </>
  );
};

LoginPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

LoginPage.guestGuard = true;

export default LoginPage;
