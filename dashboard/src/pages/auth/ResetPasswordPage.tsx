import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';

import {
  NonAuthForm,
  NonAuthLayout,
  PasswordRules,
  PasswordChangedDialog,
} from '../../components/auth';
import {
  Button,
  Grid,
  Link,
  TextInput,
  Typography,
} from '../../components/common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { APP_URL, PASSWORD_RULES } from '../../shared/constants';

/**
 * PasswordResetPage component.
 *
 * @returns {JSX.Element} The rendered component.
 */
const PasswordResetPage: React.FC<any> = ({ children }) => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shouldShowRules, setShouldShowRules] = useState(false);
  const [showChangedDialog, setShowChangedDialog] = useState(false);

  const history = useHistory();
  const location = useLocation();
  const { isMobile } = useScreenSize();
  const { handleSubmit, register, watch } = useForm<FormData>();

  const queryString = new URLSearchParams(location.search);
  const username = queryString.get('username') || '';
  const values: any = watch();

  const checkPasswordRules = (password: string, confirmPassword: string) =>
    PASSWORD_RULES.every((rule) => rule.check(password, confirmPassword));

  // eslint-disable-next-line @typescript-eslint/no-shadow
  const onSubmit = handleSubmit(async (values: any) => {
    const isValid = checkPasswordRules(values.password, values.confirmPassword);
    if (!isValid) {
      setShouldShowRules(true);
      return;
    }

    setIsSubmitting(true);

    try {
      await Auth.forgotPasswordSubmit(
        username || '',
        values.code,
        values.password,
      );
      // show password changed dialog
      showPasswordChangedDialog();
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setIsSubmitting(false);
    }
  });

  const showPasswordChangedDialog = () => {
    setShowChangedDialog(true);
  };

  const handleGoToLogIn = () => {
    setShowChangedDialog(false);
    history.push(APP_URL.login);
  };

  return (
    <NonAuthLayout minHeight={600}>
      <NonAuthForm
        instructionHeader={
          <>
            <Typography fontWeight="normal" variant={isMobile ? 'h3' : 'h2'}>
              Reset
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h2'}>Password</Typography>
          </>
        }
        instructions={
          <Typography color="gray" lineHeight="30px" variant="body1">
            Enter the reset code you received and the new password you would
            like to use.
          </Typography>
        }
        footer={
          <>
            <Typography variant="body2">Remember password?</Typography>
            <Link to={APP_URL.login} text="Login" />
          </>
        }
      >
        <form onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                label="Verify code"
                {...register('code' as any, { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                label="New Password"
                type="password"
                {...register('password' as any, { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextInput
                fullWidth
                label="Confirm Password"
                type="password"
                {...register('confirmPassword' as any, { required: true })}
              />
            </Grid>

            {shouldShowRules && (
              <Grid item xs={12}>
                <PasswordRules
                  children={children}
                  confirmPassword={values.confirmPassword}
                  password={values.password}
                  rules={PASSWORD_RULES}
                />
              </Grid>
            )}

            <Grid item xs={12}>
              <Button disabled={isSubmitting} type="submit" fullWidth>
                Change password
              </Button>
            </Grid>

            {error && (
              <Grid item xs={12}>
                {error}
              </Grid>
            )}
          </Grid>
        </form>
      </NonAuthForm>

      <PasswordChangedDialog
        open={showChangedDialog}
        onClose={handleGoToLogIn}
      />
    </NonAuthLayout>
  );
};

export default PasswordResetPage;
