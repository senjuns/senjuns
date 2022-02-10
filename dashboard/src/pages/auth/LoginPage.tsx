import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { APP_URL, ScreenSize } from 'shared/constants';
import { submitMetrics } from 'shared/analytics/metrics';
import { METRICS_TYPE } from 'shared/interfaces';
import { useAuth } from 'contexts';
import { NonAuthForm, NonAuthLayout } from 'components/auth';
import { Button, Grid, Link, TextInput, Typography } from 'components/common';

/**
 * LogInPage component.
 *
 * @returns {JSX.Element} The rendered component.
 */
const LoginPage: React.FC = () => {
  const [error, setError] = useState('');
  const { isLoggedIn, logIn, userInfo } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const history = useHistory();
  const { handleSubmit, register } = useForm<FormData>();

  const onSubmit = handleSubmit(async (data: any) => {
    setIsSubmitting(true);

    try {
      await logIn(data.email, data.password);
      history.push(APP_URL.home);
      submitMetrics(METRICS_TYPE.USER_LOGIN, { email: data.email });
    } catch (error) {
      if (error && (error as Error).message) {
        setError((error as Error).message);
      } else {
        setError('Server is unreachable.');
      }
    } finally {
      setIsSubmitting(false);
    }
  });

  useEffect(() => {
    if (isLoggedIn) {
      history.push(APP_URL.home);
      submitMetrics(METRICS_TYPE.USER_LOGIN, { email: userInfo.username });
    }
  }, [isLoggedIn]);

  return (
    <NonAuthLayout>
      <NonAuthForm
        header={
          <>
            <Typography variant="h2">Hey,</Typography>
            <Typography variant="h2">Welcome back!</Typography>
          </>
        }
        footer={<Link to={APP_URL.forgot} text="Forgot password?" />}
      >
        <Form onSubmit={onSubmit}>
          <FormHeader>
            <Typography variant="h4">Login</Typography>
          </FormHeader>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
                    label="Email"
                    {...register('email' as any, { required: true })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextInput
                    fullWidth
                    label="Password"
                    type="password"
                    {...register('password' as any, { required: true })}
                  />
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isSubmitting}
                fullWidth
                type="submit"
                id="sign_in_button"
              >
                Sign in
              </Button>
            </Grid>

            {error && (
              <Grid item xs={12}>
                {error}
              </Grid>
            )}
          </Grid>
        </Form>
      </NonAuthForm>
    </NonAuthLayout>
  );
};

const Form = styled.form`
  @media only screen and (max-width: ${ScreenSize.sm}px) {
    margin-top: 80px;
  }
`;

const FormHeader = styled.div`
  margin-bottom: 60px;
  @media only screen and (max-width: ${ScreenSize.sm}px) {
    position: absolute;
    top: 40px;
    left: 40px;
    margin-bottom: unset;
  }
`;

export default LoginPage;
