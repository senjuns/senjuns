import { MeasurementTypes } from '../../shared/interfaces';
import { timeToEpoch } from '../../shared/utils';
import { splitIntoRedAndGreenLines, getMeasurementSpecificData } from './utils';

describe('splitIntoRedAndGreenLines function', () => {
  test('it should return normal x, y coordinates and abnormal x, y coordinates', () => {
    const data = {
      timestamps: [
        timeToEpoch('2021-11-02T16:43:54.557Z'),
        timeToEpoch('2021-11-03T16:43:54.557Z'),
        timeToEpoch('2021-11-04T16:43:54.557Z'),
      ],
      values: [2, 5, 8],
    };
    const redLow = 3;
    const redHigh = 7;

    const output = {
      xNorm: [
        null,
        new Date('2021-11-03T04:43:54.000Z'),
        new Date('2021-11-03T16:43:54.000Z'),
        new Date('2021-11-04T04:43:54.000Z'),
        null,
      ],
      yNorm: [null, '3', '5', '7', null],
      xAbnormal: [
        new Date('2021-11-02T16:43:54.000Z'),
        new Date('2021-11-03T04:43:54.000Z'),
        null,
        null,
        new Date('2021-11-04T04:43:54.000Z'),
        new Date('2021-11-04T16:43:54.000Z'),
      ],
      yAbnormal: ['2', '3', null, null, '7', '8'],
    };

    const result = splitIntoRedAndGreenLines(data, redLow, redHigh);

    expect(result).toEqual(output);
  });
});

describe('getMeasurementSpecificData function', () => {
  test('it should return measurement data for a particlar meausrement type', () => {
    const measurementRuns = [
      {
        start_time: '2021-10-30T17:37:34',
        id: 1,
        metadata: {
          statistics: {
            par: { max: 91, min: 54, mean: 75 },
            air_co2: { max: 314, min: 400, mean: 358 },
            air_vpd: { max: 92, min: 57, mean: 80 },
            air_flow: { max: 96, min: 59, mean: 74 },
            leaf_vpd: { max: 100, min: 50, mean: 79 },
            air_temperature: { max: 30, min: 25, mean: 28 },
            leaf_temperature: { max: 32, min: 22, mean: 29 },
            relative_humidity: {
              max: 0.5636628650008815,
              min: 0.40110478638504854,
              mean: 0.4755591695790853,
            },
          },
        },
      },
      {
        start_time: '2021-10-30T20:22:34',
        id: 2,
        metadata: {
          statistics: {
            par: { max: 92, min: 55, mean: 78 },
            air_co2: { max: 318, min: 393, mean: 357 },
            air_vpd: { max: 92, min: 56, mean: 73 },
            air_flow: { max: 100, min: 59, mean: 73 },
            leaf_vpd: { max: 92, min: 54, mean: 70 },
            air_temperature: { max: 31, min: 23, mean: 29 },
            leaf_temperature: { max: 32, min: 25, mean: 28 },
            relative_humidity: {
              max: 0.5854642754767141,
              min: 0.403428553827375,
              mean: 0.5412637941319568,
            },
          },
        },
      },
      {
        start_time: '2021-10-30T23:07:34',
        id: 3,
        metadata: {
          statistics: {
            par: { max: 95, min: 60, mean: 78 },
            air_co2: { max: 319, min: 397, mean: 356 },
            air_vpd: { max: 90, min: 55, mean: 72 },
            air_flow: { max: 94, min: 51, mean: 70 },
            leaf_vpd: { max: 91, min: 60, mean: 80 },
            air_temperature: { max: 31, min: 23, mean: 28 },
            leaf_temperature: { max: 32, min: 24, mean: 27 },
            relative_humidity: {
              max: 0.5697520487485261,
              min: 0.40375725729420187,
              mean: 0.5469728617909586,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T01:52:34',
        id: 4,
        metadata: {
          statistics: {
            par: { max: 97, min: 54, mean: 74 },
            air_co2: { max: 317, min: 400, mean: 353 },
            air_vpd: { max: 93, min: 60, mean: 71 },
            air_flow: { max: 97, min: 53, mean: 75 },
            leaf_vpd: { max: 100, min: 59, mean: 70 },
            air_temperature: { max: 32, min: 24, mean: 28 },
            leaf_temperature: { max: 32, min: 25, mean: 28 },
            relative_humidity: {
              max: 0.5562412825072673,
              min: 0.41132206604953414,
              mean: 0.48233989586567094,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T04:37:34',
        id: 5,
        metadata: {
          statistics: {
            par: { max: 94, min: 60, mean: 76 },
            air_co2: { max: 320, min: 395, mean: 351 },
            air_vpd: { max: 93, min: 60, mean: 80 },
            air_flow: { max: 97, min: 54, mean: 71 },
            leaf_vpd: { max: 93, min: 54, mean: 80 },
            air_temperature: { max: 30, min: 24, mean: 29 },
            leaf_temperature: { max: 32, min: 22, mean: 29 },
            relative_humidity: {
              max: 0.5768685137001227,
              min: 0.41791982123285465,
              mean: 0.4979005563254468,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T07:22:34',
        id: 6,
        metadata: {
          statistics: {
            par: { max: 95, min: 59, mean: 71 },
            air_co2: { max: 312, min: 399, mean: 351 },
            air_vpd: { max: 91, min: 58, mean: 78 },
            air_flow: { max: 90, min: 57, mean: 79 },
            leaf_vpd: { max: 100, min: 55, mean: 71 },
            air_temperature: { max: 31, min: 22, mean: 28 },
            leaf_temperature: { max: 30, min: 22, mean: 30 },
            relative_humidity: {
              max: 0.5691822210367482,
              min: 0.42989935753259634,
              mean: 0.4553730552817395,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T10:07:34',
        id: 7,
        metadata: {
          statistics: {
            par: { max: 91, min: 56, mean: 73 },
            air_co2: { max: 316, min: 395, mean: 357 },
            air_vpd: { max: 97, min: 54, mean: 74 },
            air_flow: { max: 93, min: 51, mean: 73 },
            leaf_vpd: { max: 91, min: 58, mean: 80 },
            air_temperature: { max: 31, min: 24, mean: 29 },
            leaf_temperature: { max: 31, min: 22, mean: 29 },
            relative_humidity: {
              max: 0.553962214412333,
              min: 0.42682114406099286,
              mean: 0.501076473664103,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T12:52:34',
        id: 8,
        metadata: {
          statistics: {
            par: { max: 94, min: 51, mean: 72 },
            air_co2: { max: 313, min: 395, mean: 353 },
            air_vpd: { max: 93, min: 60, mean: 72 },
            air_flow: { max: 91, min: 51, mean: 77 },
            leaf_vpd: { max: 97, min: 57, mean: 75 },
            air_temperature: { max: 30, min: 25, mean: 29 },
            leaf_temperature: { max: 30, min: 22, mean: 27 },
            relative_humidity: {
              max: 0.5895460099580215,
              min: 0.43071079115730604,
              mean: 0.46329070119684973,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T15:37:34',
        id: 9,
        metadata: {
          statistics: {
            par: { max: 98, min: 50, mean: 76 },
            air_co2: { max: 313, min: 391, mean: 356 },
            air_vpd: { max: 91, min: 60, mean: 76 },
            air_flow: { max: 93, min: 56, mean: 78 },
            leaf_vpd: { max: 91, min: 60, mean: 79 },
            air_temperature: { max: 30, min: 24, mean: 29 },
            leaf_temperature: { max: 32, min: 24, mean: 28 },
            relative_humidity: {
              max: 0.5522727658718405,
              min: 0.43866555686748665,
              mean: 0.526872834154027,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T18:22:34',
        id: 10,
        metadata: {
          statistics: {
            par: { max: 99, min: 55, mean: 73 },
            air_co2: { max: 316, min: 393, mean: 358 },
            air_vpd: { max: 93, min: 55, mean: 73 },
            air_flow: { max: 94, min: 54, mean: 70 },
            leaf_vpd: { max: 99, min: 52, mean: 80 },
            air_temperature: { max: 32, min: 25, mean: 29 },
            leaf_temperature: { max: 30, min: 25, mean: 30 },
            relative_humidity: {
              max: 0.5852335823978051,
              min: 0.4038676836354761,
              mean: 0.5392192644820448,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T21:07:34',
        id: 11,
        metadata: {
          statistics: {
            par: { max: 100, min: 58, mean: 73 },
            air_co2: { max: 315, min: 391, mean: 359 },
            air_vpd: { max: 90, min: 53, mean: 79 },
            air_flow: { max: 98, min: 50, mean: 79 },
            leaf_vpd: { max: 91, min: 54, mean: 80 },
            air_temperature: { max: 32, min: 23, mean: 27 },
            leaf_temperature: { max: 31, min: 24, mean: 29 },
            relative_humidity: {
              max: 0.5888277651080046,
              min: 0.4102587162924211,
              mean: 0.5494531547962701,
            },
          },
        },
      },
      {
        start_time: '2021-10-31T23:52:34',
        id: 12,
        metadata: {
          statistics: {
            par: { max: 90, min: 56, mean: 75 },
            air_co2: { max: 316, min: 393, mean: 356 },
            air_vpd: { max: 92, min: 55, mean: 79 },
            air_flow: { max: 95, min: 50, mean: 70 },
            leaf_vpd: { max: 97, min: 50, mean: 72 },
            air_temperature: { max: 32, min: 23, mean: 29 },
            leaf_temperature: { max: 32, min: 22, mean: 27 },
            relative_humidity: {
              max: 0.5857177821548203,
              min: 0.41505208818591277,
              mean: 0.509601049159189,
            },
          },
        },
      },
      {
        start_time: '2021-11-01T02:37:34',
        id: 13,
        metadata: {
          statistics: {
            par: { max: 96, min: 60, mean: 80 },
            air_co2: { max: 317, min: 390, mean: 352 },
            air_vpd: { max: 97, min: 57, mean: 80 },
            air_flow: { max: 95, min: 54, mean: 78 },
            leaf_vpd: { max: 91, min: 60, mean: 79 },
            air_temperature: { max: 30, min: 25, mean: 28 },
            leaf_temperature: { max: 31, min: 25, mean: 30 },
            relative_humidity: {
              max: 0.5631856182362345,
              min: 0.4057712514292357,
              mean: 0.48216084241024165,
            },
          },
        },
      },
      {
        start_time: '2021-11-01T05:22:34',
        id: 14,
        metadata: {
          statistics: {
            par: { max: 100, min: 55, mean: 77 },
            air_co2: { max: 312, min: 400, mean: 357 },
            air_vpd: { max: 90, min: 52, mean: 71 },
            air_flow: { max: 90, min: 50, mean: 76 },
            leaf_vpd: { max: 93, min: 53, mean: 77 },
            air_temperature: { max: 32, min: 22, mean: 30 },
            leaf_temperature: { max: 30, min: 22, mean: 27 },
            relative_humidity: {
              max: 0.5924639473504668,
              min: 0.40997879494870093,
              mean: 0.5181857794183407,
            },
          },
        },
      },
      {
        start_time: '2021-11-01T08:07:34',
        id: 15,
        metadata: {
          statistics: {
            par: { max: 93, min: 55, mean: 70 },
            air_co2: { max: 312, min: 391, mean: 355 },
            air_vpd: { max: 95, min: 59, mean: 71 },
            air_flow: { max: 96, min: 60, mean: 79 },
            leaf_vpd: { max: 97, min: 50, mean: 79 },
            air_temperature: { max: 31, min: 25, mean: 30 },
            leaf_temperature: { max: 32, min: 23, mean: 27 },
            relative_humidity: {
              max: 0.5557993373148195,
              min: 0.42532327785862445,
              mean: 0.509092891504005,
            },
          },
        },
      },
    ];

    const growthCycles = [
      {
        id: 11,
        start_time: '2021-10-04T00:00:00',
        end_time: '2021-11-29T00:00:00',
        zone_id: 1,
        metadata: {
          monitoring_parameters: {
            par: {
              dark: {
                green: { max: 10, min: 0 },
                yellow: { max: 50, min: 0 },
              },
              light: {
                green: { max: 700, min: 550 },
                yellow: { max: 799, min: 450 },
              },
            },
            air_co2: {
              dark: {
                green: { max: 1500, min: 1200 },
                yellow: { max: 1700, min: 1000 },
              },
              light: {
                green: { max: 1500, min: 1200 },
                yellow: { max: 1700, min: 1000 },
              },
            },
            air_vpd: {
              dark: {
                green: { max: 1.7, min: 1.0 },
                yellow: { max: 2.2, min: 0.7 },
              },
              light: {
                green: { max: 1.7, min: 1.0 },
                yellow: { max: 2.2, min: 0.7 },
              },
            },
            air_flow: {
              dark: {
                green: { max: 666, min: 555 },
                yellow: { max: 777, min: 444 },
              },
              light: {
                green: { max: 222, min: 111 },
                yellow: { max: 333, min: 0 },
              },
            },
            leaf_vpd: {
              dark: {
                green: { max: 1.2, min: 0.8 },
                yellow: { max: 1.5, min: 0.5 },
              },
              light: {
                green: { max: 1.2, min: 0.8 },
                yellow: { max: 1.5, min: 0.5 },
              },
            },
            air_temperature: {
              dark: {
                green: { max: 24, min: 21 },
                yellow: { max: 27, min: 18 },
              },
              light: {
                green: { max: 29, min: 26 },
                yellow: { max: 32, min: 24 },
              },
            },
            leaf_temperature: {
              dark: {
                green: { max: 22, min: 19 },
                yellow: { max: 25, min: 16 },
              },
              light: {
                green: { max: 27, min: 24 },
                yellow: { max: 30, min: 22 },
              },
            },
            relative_humidity: {
              dark: {
                green: { max: 63, min: 57 },
                yellow: { max: 68, min: 52 },
              },
              light: {
                green: { max: 63, min: 57 },
                yellow: { max: 68, min: 52 },
              },
            },
          },
        },
      },
    ];

    const result = getMeasurementSpecificData(
      measurementRuns,
      growthCycles,
      MeasurementTypes.Temperature
    );

    const output = {
      data: {
        timestamps: [
          1635615454, 1635625354, 1635635254, 1635645154, 1635655054,
          1635664954, 1635674854, 1635684754, 1635694654, 1635704554,
          1635714454, 1635724354, 1635734254, 1635744154, 1635754054,
        ],
        values: [28, 29, 28, 28, 29, 28, 29, 29, 29, 29, 27, 29, 28, 30, 30],
      },
      min: 26.4,
      max: 30.6,
      monitoringParams: {
        dark: { green: { max: 24, min: 21 }, yellow: { max: 27, min: 18 } },
        light: { green: { max: 29, min: 26 }, yellow: { max: 32, min: 24 } },
      },
    };

    expect(result).toEqual(output);
  });
});
