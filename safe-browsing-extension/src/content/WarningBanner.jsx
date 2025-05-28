export default function WarningBanner() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      backgroundColor: 'red',
      color: 'white',
      padding: '1rem',
      textAlign: 'center',
      zIndex: 9999
    }}>
      ⚠️ Warning: This site may be malicious!
    </div>
  );
}
