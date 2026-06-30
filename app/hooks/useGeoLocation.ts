import { useState, useEffect } from "react";

export default function useGeolocation(options?: PositionOptions) {
  const isGeolocationSupported =
    typeof navigator !== "undefined" && !!navigator.geolocation;
  const [loading, setLoading] = useState<boolean>(!isGeolocationSupported);
  const [error, setError] = useState<GeolocationPositionError | null>(
    isGeolocationSupported
      ? null
      : ({
          code: 0,
          message: "Geolocation not supported",
        } as GeolocationPositionError),
  );
  const [data, setData] = useState<GeolocationCoordinates | null>(null);

  useEffect(() => {
    if (!isGeolocationSupported) {
      return;
    }

    const successHandler = (e: GeolocationPosition) => {
      setLoading(false);
      setError(null);
      setData(e.coords);
    };
    const errorHandler = (e: GeolocationPositionError) => {
      setError(e);
      setLoading(false);
    };

    navigator.geolocation.getCurrentPosition(
      successHandler,
      errorHandler,
      options,
    );
    const id = navigator.geolocation.watchPosition(
      successHandler,
      errorHandler,
      options,
    );
    return () => navigator.geolocation.clearWatch(id);
  }, [isGeolocationSupported, options]);

  return { loading, error, data };
}
