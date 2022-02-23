import { Auth } from 'aws-amplify';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { NonAuthForm, NonAuthLayout } from '../../components/auth';
import {
  Button,
  Grid,
  Link,
  TextInput,
  Typography,
} from '../../components/common';
import { useScreenSize } from '../../hooks/useScreenSize';
import { APP_URL, AWS_API_CODE } from '../../shared/constants';

/**
 * ForgotPasswordPage component.
 *
 * @returns {JSX.Element} The rendered component.
 */
const ForgotPasswordPage: React.FC = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isMobile } = useScreenSize();

  const history = useHistory();
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = handleSubmit(async (values: any) => {
    setIsSubmitting(true);

    try {
      await Auth.forgotPassword(values.email);
      history.push(APP_URL.resetPassword(values.email));
      // eslint-disable-next-line @typescript-eslint/no-shadow
    } catch (error) {
      if ((error as any).code === AWS_API_CODE.user_not_found_exception) {
        setError('There was error during forgot password');
      } else {
        setError('Server is unreachable');
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  return (
    <NonAuthLayout>
      <NonAuthForm
        instructionHeader={
          <>
            <Typography fontWeight="normal" variant={isMobile ? 'h3' : 'h2'}>
              Forgot
            </Typography>
            <Typography variant={isMobile ? 'h3' : 'h2'}>password</Typography>
          </>
        }
        instructions={
          <Typography color="gray" lineHeight="30px" variant="body1">
            Enter your registered email below to receive password reset
            instructions
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
                label="Email"
                {...register('email' as any, { required: true })}
              />
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isSubmitting} fullWidth type="submit">
                Send code
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
    </NonAuthLayout>
  );
};

export default ForgotPasswordPage;
