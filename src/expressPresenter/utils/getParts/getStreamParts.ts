import DataBeforeFirstBoundary from '../../../errors/DataBeforeFirstBoundary';
import DataBeyondFinalBoundary from '../../../errors/DataBeyondFinalBoundary';

export default (data: string, boundary: string): string[] => {
  const partBoundary = new RegExp(`\\r?\\n?--${boundary}`);
  const dataParts = data.split(partBoundary);

  if (dataParts.length > 0 && dataParts[0] !== '') {
    throw new DataBeforeFirstBoundary();
  }

  if (dataParts.length > 1 && dataParts[dataParts.length - 1] !== '--') {
    throw new DataBeyondFinalBoundary();
  }

  return dataParts.slice(1, -1);
};
