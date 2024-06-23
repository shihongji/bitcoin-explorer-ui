interface RefreshButtonProps {
  onRefresh: () => void;
}
function RefreshButton({ onRefresh }: RefreshButtonProps) {
  return (
    <button 
      onClick={onRefresh} 
      style={{
        marginTop: '20px',
        marginBottom: '20px',
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer'
      }}
    >
      Refresh Data
    </button>
  );
}

export default RefreshButton;
