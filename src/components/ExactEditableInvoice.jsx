import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const ExactEditableInvoice = () => {
  const invoiceRef = useRef(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Simplified initial state: removed business name, tagline, address, and phone
  const [invoiceData, setInvoiceData] = useState({
    to: 'FSE Solutions Pvt Ltd,',
    subject: '1inch Series Double Door',
    description: '1 inch Series Handle, Middle With Double Door White Colour Composite Panel with Fitting with Hinges',
    items: [
      {
        particulate: 'Double Door',
        size: '102 1/2 * 7',
        sqFt: '73.5',
        totalSqFt: 73.5,
        rate: 185,
        amount: 13597.5,
      }
    ],
    gstRate: 18,
    terms: '1. 60% Advance Payment Applicable\n2. 20% After Glass Work\n3. 15% After Celling Work\n4. 5% After Complete Work',
    signoff: 'Shantanu Glass and Aluminum'
  });

  const handleInputChange = (e, field) => {
    setInvoiceData({ ...invoiceData, [field]: e.target.value });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;
    
    if (field === 'totalSqFt' || field === 'rate') {
      const sqFt = parseFloat(newItems[index].totalSqFt) || 0;
      const rate = parseFloat(newItems[index].rate) || 0;
      newItems[index].amount = sqFt * rate;
    }
    
    setInvoiceData({ ...invoiceData, items: newItems });
  };

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [
        ...invoiceData.items,
        { particulate: '', size: '', sqFt: '', totalSqFt: '', rate: '', amount: 0 }
      ]
    });
  };

  const removeItem = (indexToRemove) => {
    setInvoiceData({
      ...invoiceData,
      items: invoiceData.items.filter((_, index) => index !== indexToRemove)
    });
  };

  const subtotal = invoiceData.items.reduce((acc, item) => acc + Number(item.amount), 0);
  const gst = Math.round(subtotal * (invoiceData.gstRate / 100));
  const grandTotal = Math.round(subtotal + gst);

  const downloadPDF = () => {
    const input = invoiceRef.current;
    
    // 1. Lower scale to 1.5 (keeps it sharp but drastically reduces size)
    html2canvas(input, { 
      scale: 1.5, 
      useCORS: true,
      logging: false,
    }).then((canvas) => {
      // 2. Use JPEG with 0.7 quality (compresses the image data)
      const imgData = canvas.toDataURL('image/jpeg', 0.7); 
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(imgData);
      const scaledHeight = (imgProps.height * pdfWidth) / imgProps.width;

      // 3. Add to PDF with 'FAST' compression enabled
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, scaledHeight, undefined, 'FAST');
      
      const safeFilename = invoiceData.to.replace(/[^a-zA-Z0-9]/g, '_');
      pdf.save(`${safeFilename}_Invoice.pdf`);
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', minHeight: '100vh', height: isMobile ? 'auto' : '100vh', backgroundColor: '#e2e8f0' }}>
      
      {/* LEFT COLUMN: Editor Form (Now beautifully streamlined) */}
      <div style={{ 
        flex: isMobile ? 'none' : '0 0 450px', 
        width: isMobile ? '100%' : 'auto', 
        padding: isMobile ? '15px' : '20px', 
        backgroundColor: 'white', 
        overflowY: isMobile ? 'visible' : 'auto', 
        borderRight: isMobile ? 'none' : '1px solid #ccc', 
        borderBottom: isMobile ? '2px solid #94a3b8' : 'none',
        boxShadow: isMobile ? 'none' : '2px 0 5px rgba(0,0,0,0.1)',
        boxSizing: 'border-box'
      }}>
        <h2 style={{ marginTop: 0, marginBottom: '20px', fontSize: '20px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>Edit Invoice Variables</h2>
        
        {/* Top inputs removed! Form goes straight to Client info */}
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Billed To</label>
          <input type="text" value={invoiceData.to} onChange={(e) => handleInputChange(e, 'to')} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Subject</label>
          <input type="text" value={invoiceData.subject} onChange={(e) => handleInputChange(e, 'subject')} style={styles.input} />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Description</label>
          <textarea value={invoiceData.description} onChange={(e) => handleInputChange(e, 'description')} style={styles.input} rows={3} />
        </div>

        <hr style={{ margin: '20px 0' }} />

        <h3 style={{ fontSize: '16px', marginBottom: '10px' }}>Item Details</h3>
        
        {invoiceData.items.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#f8fafc', padding: '15px', borderRadius: '5px', marginBottom: '15px', border: '1px solid #cbd5e1', position: 'relative' }}>
            
            {invoiceData.items.length > 1 && (
              <button 
                onClick={() => removeItem(index)} 
                style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: '#ef4444', color: 'white', border: 'none', borderRadius: '3px', padding: '4px 8px', cursor: 'pointer', fontSize: '12px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                X Remove
              </button>
            )}

            <div style={styles.inputGroup}>
              <label style={styles.label}>Particulate Name</label>
              <input type="text" value={item.particulate} onChange={(e) => handleItemChange(index, 'particulate', e.target.value)} style={styles.input} />
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px' }}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Size (Text)</label>
                <input type="text" value={item.size} onChange={(e) => handleItemChange(index, 'size', e.target.value)} style={styles.input} />
              </div>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Sq/Ft (Text)</label>
                <input type="text" value={item.sqFt} onChange={(e) => handleItemChange(index, 'sqFt', e.target.value)} style={styles.input} />
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: '10px' }}>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Total Sq/Ft (Number)</label>
                <input type="number" value={item.totalSqFt} onChange={(e) => handleItemChange(index, 'totalSqFt', e.target.value)} style={styles.input} />
              </div>
              <div style={{ ...styles.inputGroup, flex: 1 }}>
                <label style={styles.label}>Rate</label>
                <input type="number" value={item.rate} onChange={(e) => handleItemChange(index, 'rate', e.target.value)} style={styles.input} />
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addItem} 
          style={{ padding: '10px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginBottom: '20px', width: '100%', fontWeight: 'bold', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
          + Add Another Item
        </button>

        <div style={styles.inputGroup}>
          <label style={styles.label}>GST Percentage (%)</label>
          <input type="number" value={invoiceData.gstRate} onChange={(e) => handleInputChange(e, 'gstRate')} style={styles.input} />
        </div>

        <div style={styles.inputGroup}>
          <label style={styles.label}>Terms & Conditions (One per line)</label>
          <textarea value={invoiceData.terms} onChange={(e) => handleInputChange(e, 'terms')} style={styles.input} rows={5} />
        </div>
        
        <div style={styles.inputGroup}>
          <label style={styles.label}>Signoff Name</label>
          <input type="text" value={invoiceData.signoff} onChange={(e) => handleInputChange(e, 'signoff')} style={styles.input} />
        </div>

        {!isMobile && (
          <button 
            onClick={downloadPDF} 
            style={{ padding: '15px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px', width: '100%', fontSize: '16px', fontWeight: 'bold', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            Download as PDF
          </button>
        )}
      </div>

      {/* RIGHT COLUMN: The Exact PDF Template Preview */}
      <div style={{ 
        flex: 1, 
        overflowX: 'auto', 
        overflowY: isMobile ? 'visible' : 'auto', 
        padding: isMobile ? '10px' : '40px', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: isMobile ? 'flex-start' : 'center',
        backgroundColor: '#e2e8f0',
        width: isMobile ? '100%' : 'auto',
        boxSizing: 'border-box'
      }}>
        
        {isMobile && (
          <div style={{ position: 'sticky', left: '10px', width: 'calc(100vw - 20px)', zIndex: 10, marginBottom: '20px' }}>
            <button 
              onClick={downloadPDF} 
              style={{ width: '100%', padding: '15px', backgroundColor: '#0f172a', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
              Download as PDF
            </button>
          </div>
        )}

        <div 
          ref={invoiceRef} 
          style={{ 
            width: '210mm', 
            minHeight: '297mm', 
            backgroundColor: 'white', 
            padding: '20mm', 
            boxSizing: 'border-box', 
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif', 
            color: 'black',
            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
          }}>
          
          {/* HARDCODED BANNER - Perfectly placed at the top */}
          <div style={{ marginBottom: '20px' }}>
             <img src="/logo-sg.png" alt="Shantanu Glass Banner" style={{ width: '100%', height: 'auto', display: 'block' }} />
          </div>
          
          <div style={{ marginBottom: '25px', fontSize: '15px', lineHeight: '1.6' }}>
            <div><strong>To.</strong> {invoiceData.to}</div>
            <div><strong>Sub:</strong> {invoiceData.subject}</div>
            <div><strong>Description:</strong> {invoiceData.description}</div>
          </div>
          
          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '30px', fontSize: '14px' }}>
            <thead>
              <tr>
                <th style={styles.th}>Particulates</th>
                <th style={styles.thCenter}>Size</th>
                <th style={styles.thCenter}>Sq/Ft</th>
                <th style={styles.thCenter}>Total Sq/Ft</th>
                <th style={styles.thCenter}>Rate</th>
                <th style={styles.thRight}>Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.items.map((item, index) => (
                <tr key={index}>
                  <td style={styles.td}>{item.particulate}</td>
                  <td style={styles.tdCenter}>{item.size}</td>
                  <td style={styles.tdCenter}>{item.sqFt}</td>
                  <td style={styles.tdCenter}>{item.totalSqFt}</td>
                  <td style={styles.tdCenter}>{item.rate}</td>
                  <td style={styles.tdRight}>{Math.round(item.amount).toLocaleString('en-IN')}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            
            <div style={{ width: '55%', fontSize: '14px', lineHeight: '1.8' }}>
              <div style={{ fontWeight: 'bold', textDecoration: 'underline', marginBottom: '10px' }}>Terms & Conditions</div>
              {invoiceData.terms.split('\n').map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
            
            <div style={{ width: '40%' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                <tbody>
                  <tr>
                    <td style={styles.totLabel}>Total</td>
                    <td style={styles.totValue}>{Math.round(subtotal).toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td style={styles.totLabel}>GST {invoiceData.gstRate}%</td>
                    <td style={styles.totValue}>{gst.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr>
                    <td style={styles.totLabelBold}>Total Amount</td>
                    <td style={styles.totValueBold}>{grandTotal.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <div style={{ marginTop: '70px', textAlign: 'right', fontSize: '15px', fontWeight: 'bold' }}>
            <p style={{ margin: '0 0 50px 0' }}>Thanks</p>
            <p style={{ margin: '0' }}>{invoiceData.signoff}</p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

// Styling definitions
const styles = {
  inputGroup: { marginBottom: '12px' },
  label: { display: 'block', marginBottom: '5px', fontSize: '13px', fontWeight: 'bold', color: '#334155', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' },
  input: { width: '100%', padding: '8px', border: '1px solid #cbd5e1', borderRadius: '4px', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit' },
  
  th: { border: '1px solid black', padding: '10px', textAlign: 'left', fontWeight: 'bold' },
  thCenter: { border: '1px solid black', padding: '10px', textAlign: 'center', fontWeight: 'bold' },
  thRight: { border: '1px solid black', padding: '10px', textAlign: 'right', fontWeight: 'bold' },
  
  td: { border: '1px solid black', padding: '10px', textAlign: 'left' },
  tdCenter: { border: '1px solid black', padding: '10px', textAlign: 'center' },
  tdRight: { border: '1px solid black', padding: '10px', textAlign: 'right' },
  
  totLabel: { border: '1px solid black', padding: '10px', textAlign: 'right', fontWeight: 'bold' },
  totValue: { border: '1px solid black', padding: '10px', textAlign: 'right' },
  totLabelBold: { border: '1px solid black', padding: '10px', textAlign: 'right', fontWeight: 'bold' },
  totValueBold: { border: '1px solid black', padding: '10px', textAlign: 'right', fontWeight: 'bold' }
};

export default ExactEditableInvoice;