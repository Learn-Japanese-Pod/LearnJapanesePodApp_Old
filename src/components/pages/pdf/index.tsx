import React from 'react';
import PDFReader from 'rn-pdf-reader-js';

export const Pdf = ({ route }) => {
  const { url } = route.params;

  return (
    <PDFReader
      source={{
        uri: url,
      }}
    />
  );
};
