interface ILightHoursReturn {
  /**
   * Light Hours
   */
  lightHours: number;
  /**
   * Current Time Offset In Hours
   */
  currentTimeOffsetInHours: number;
}

export const useLightHours = (lightInfo: any): ILightHoursReturn => {
  if (!lightInfo) {
    return {
      lightHours: 0,
      currentTimeOffsetInHours: 0,
    };
  }

  const lightOnStartTime =
    lightInfo[0]?.light_on_start_time.hour +
    lightInfo[0]?.light_on_start_time.minute / 60.0;
  const lightHours = parseInt(lightInfo[0]?.light_on_duration_minutes) / 60.0;
  const currentTimeOffsetInHours =
    (Math.floor(
      new Date().getHours() + new Date().getMinutes() / 60.0 - lightOnStartTime
    ) +
      24) %
    24;

  return { lightHours, currentTimeOffsetInHours };
};
