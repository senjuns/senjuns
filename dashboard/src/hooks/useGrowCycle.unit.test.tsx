import { render, screen, waitFor } from '@testing-library/react';
import { useGrowCycle } from './useGrowCycle';

const mockGrowthCycleData = {
  data: {
    growth_cycle: [
      {
        id: 1,
        start_time: '2021-12-22T00:00:00+00:00',
        end_time: '2022-02-16T00:00:00+00:00',
        zone_id: 1,
        metadata: {
          light_info: [
            {
              light_on_start_time: {
                hour: 8,
                minute: 0,
              },
              light_on_duration_minutes: 720,
              light_cycle_configuration_start_timestamp_seconds: 1642621773,
            },
          ],
          plant_info: [
            {
              count: 313,
              strain_name: 'Mystery Kush',
            },
            {
              count: 389,
              strain_name: 'Chocolatina',
            },
            {
              count: 302,
              strain_name: 'Skywalker',
            },
          ],
          monitoring_parameters: {
            par: {
              dark: {
                green: {
                  max: 10,
                  min: 0,
                },
                yellow: {
                  max: 50,
                  min: 0,
                },
              },
              light: {
                green: {
                  max: 700,
                  min: 550,
                },
                yellow: {
                  max: 799,
                  min: 450,
                },
              },
            },
          },
        },
        __typename: 'growth_cycle',
      },
    ],
  },
};

jest.mock('graphql/generated/react_apollo', () => ({
  useGetGrowthCycleByZoneIdAndDateQuery: () => mockGrowthCycleData,
}));

const GrowCycleUse = ({ zoneId }: { zoneId: number | null }) => {
  const { loading, error, plantInfo, lightInfo } = useGrowCycle(
    zoneId,
    new Date()
  );

  return (
    <div>
      <div data-testid="loading">{loading ? 'true' : 'false'}</div>
      <div data-testid="error">{error || 'null'}</div>
      <div data-testid="plant-info-length">{plantInfo?.length || 0}</div>
      <div data-testid="light-info">
        {lightInfo?.[0].light_cycle_configuration_start_timestamp_seconds ||
          'null'}
      </div>
    </div>
  );
};

describe('useGrowCycle test', () => {
  test('useGrowCycle with null zoneId', () => {
    render(<GrowCycleUse zoneId={null} />);

    expect(screen.getByTestId('loading')).toHaveTextContent('false');
    expect(screen.getByTestId('error')).toHaveTextContent('invalid parameters');
    expect(screen.getByTestId('plant-info-length')).toHaveTextContent('0');
    expect(screen.getByTestId('light-info')).toHaveTextContent('null');
  });

  test('useGrowCycle with zoneId as 1', async () => {
    render(<GrowCycleUse zoneId={1} />);

    await waitFor(() => {
      expect(screen.getByTestId('loading')).toHaveTextContent('false');
      expect(screen.getByTestId('error')).toHaveTextContent('null');
      expect(screen.getByTestId('plant-info-length')).toHaveTextContent(
        String(
          mockGrowthCycleData.data.growth_cycle[0].metadata.plant_info.length
        )
      );
      expect(screen.getByTestId('light-info')).toHaveTextContent(
        String(
          mockGrowthCycleData.data.growth_cycle[0].metadata.light_info[0]
            .light_cycle_configuration_start_timestamp_seconds
        )
      );
    });
  });
});
