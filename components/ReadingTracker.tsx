import React, { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  totalPages: number;
  currentPage: number;
}

const ReadingTracker: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', totalPages: 180, currentPage: 45 },
    { id: 2, title: '1984', author: 'George Orwell', totalPages: 328, currentPage: 120 },
    { id: 3, title: 'To Kill a Mockingbird', author: 'Harper Lee', totalPages: 281, currentPage: 281 },
  ]);

  const [newPage, setNewPage] = useState<{ [key: number]: string }>({});

  const updateProgress = (bookId: number) => {
    const pageNumber = parseInt(newPage[bookId] || '0');
    if (pageNumber > 0) {
      setBooks(books.map(book => 
        book.id === bookId 
          ? { ...book, currentPage: Math.min(pageNumber, book.totalPages) }
          : book
      ));
      setNewPage({ ...newPage, [bookId]: '' });
    }
  };

  const calculateProgress = (current: number, total: number): number => {
    return Math.round((current / total) * 100);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: '#333', marginBottom: '30px' }}>📚 Reading Tracker</h1>
      
      {books.map(book => {
        const progress = calculateProgress(book.currentPage, book.totalPages);
        const isComplete = book.currentPage >= book.totalPages;
        
        return (
          <div 
            key={book.id} 
            style={{ 
              border: '1px solid #ddd', 
              borderRadius: '8px', 
              padding: '20px', 
              marginBottom: '20px',
              backgroundColor: isComplete ? '#e8f5e9' : '#fff'
            }}
          >
            <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>{book.title}</h2>
            <p style={{ margin: '0 0 15px 0', color: '#7f8c8d', fontSize: '14px' }}>
              by {book.author}
            </p>
            
            <div style={{ marginBottom: '15px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '5px',
                fontSize: '14px',
                color: '#555'
              }}>
                <span>Progress: {book.currentPage} / {book.totalPages} pages</span>
                <span>{progress}%</span>
              </div>
              
              <div style={{ 
                width: '100%', 
                height: '20px', 
                backgroundColor: '#ecf0f1', 
                borderRadius: '10px',
                overflow: 'hidden'
              }}>
                <div style={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  backgroundColor: isComplete ? '#27ae60' : '#3498db',
                  transition: 'width 0.3s ease'
                }} />
              </div>
            </div>
            
            {!isComplete && (
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <input
                  type="number"
                  placeholder="Page number"
                  value={newPage[book.id] || ''}
                  onChange={(e) => setNewPage({ ...newPage, [book.id]: e.target.value })}
                  style={{ 
                    padding: '8px 12px', 
                    border: '1px solid #ddd', 
                    borderRadius: '4px',
                    flex: 1,
                    fontSize: '14px'
                  }}
                  min="0"
                  max={book.totalPages}
                />
                <button
                  onClick={() => updateProgress(book.id)}
                  style={{ 
                    padding: '8px 20px', 
                    backgroundColor: '#3498db', 
                    color: 'white', 
                    border: 'none', 
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}
                >
                  Update
                </button>
              </div>
            )}
            
            {isComplete && (
              <div style={{ 
                color: '#27ae60', 
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                ✓ Completed!
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ReadingTracker;
