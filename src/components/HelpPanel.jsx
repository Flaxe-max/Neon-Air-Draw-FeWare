import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, HelpCircle } from 'lucide-react';
import { translations } from '../translations';

export default function HelpPanel({ isOpen, onClose, language }) {
  const t = translations[language];

  const gestures = [
    {
      section: t.drawHand,
      items: [
        { emoji: '☝️', gesture: t.indexUp, action: t.drawAction },
        { emoji: '🤏', gesture: t.pinchGesture, action: t.eraseAction },
        { emoji: '✊', gesture: t.fistGesture, action: t.clearAction },
      ],
    },
    {
      section: t.controlHand,
      items: [
        { emoji: '✌️', gesture: t.twoFingersUp, action: t.moveAction },
        { emoji: '🤏', gesture: t.pinchScale, action: t.scaleAction },
        { emoji: '🖐️', gesture: t.palmTwist, action: t.rotateAction },
      ],
    },
    {
      section: t.tips,
      items: [
        { emoji: '💡', gesture: t.oneHandTip, action: t.oneHandAction },
        { emoji: '📐', gesture: t.snapTip, action: t.snapAction },
        { emoji: '🌀', gesture: t.driftTip, action: t.driftAction },
      ],
    },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(8px)',
          }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-meta"
            style={{
              width: '380px',
              maxHeight: '80vh',
              overflowY: 'auto',
              borderRadius: '20px',
              padding: '24px',
              color: '#fff',
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={20} style={{ color: '#00ffff' }} />
                <span style={{ fontSize: '16px', fontWeight: 700, letterSpacing: '0.05em' }}>{t.gestureGuide}</span>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Gesture Sections */}
            {gestures.map((section, sIdx) => (
              <div key={sIdx} style={{ marginBottom: sIdx < gestures.length - 1 ? '16px' : 0 }}>
                <div style={{
                  fontSize: '11px',
                  fontWeight: 600,
                  color: 'rgba(255, 255, 255, 0.45)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  marginBottom: '8px',
                }}>
                  {section.section}
                </div>
                {section.items.map((item, iIdx) => (
                  <div
                    key={iIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '8px 10px',
                      borderRadius: '10px',
                      marginBottom: '4px',
                      backgroundColor: 'rgba(255, 255, 255, 0.04)',
                    }}
                  >
                    <span style={{ fontSize: '20px', width: '28px', textAlign: 'center' }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600 }}>{item.gesture}</div>
                      <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{item.action}</div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
