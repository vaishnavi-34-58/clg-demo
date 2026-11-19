import React, { useState } from 'react';
import { FileCheck, Download, Plus, Printer } from 'lucide-react';
import { MOCK_CERTIFICATE_REQUESTS, CertificateRequest } from '../../mock/certificates.mock';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { useToast } from '../../context/ToastContext';

export const CertificatesView: React.FC = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<CertificateRequest[]>(MOCK_CERTIFICATE_REQUESTS);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedDownloadCert, setSelectedDownloadCert] = useState<CertificateRequest | null>(null);

  // Form State
  const [certType, setCertType] = useState<CertificateRequest['certificateType']>('Bonafide Certificate');
  const [purpose, setPurpose] = useState('');

  const handleApplyCertificate = (e: React.FormEvent) => {
    e.preventDefault();
    const newReq: CertificateRequest = {
      id: `REQ-2024-0${Math.floor(20 + Math.random() * 80)}`,
      certificateType: certType,
      purpose,
      appliedDate: 'Today',
      status: 'In Process',
      remarks: 'Application received and routed to Registrar desk for verification.',
    };

    setRequests([newReq, ...requests]);
    setIsRequestModalOpen(false);
    setPurpose('');
    toast(`Request for ${certType} submitted successfully!`, 'success');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900">
            Official Certificates &amp; Academic Documents
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Request official signed bonafide, study and conduct credentials with digital verification codes
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setIsRequestModalOpen(true)}
          className="gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Request New Certificate</span>
        </Button>
      </div>

      {/* Available Certificate Types Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { title: 'Bonafide Student Certificate', desc: 'Certifies active university enrollment for bank loans, scholarships, or visa renewals.', time: 'Instant Digital / 24 Hours' },
          { title: 'Study & Medium of Instruction', desc: 'Validates that your degree is delivered in the English language for graduate applications.', time: '2 Business Days' },
          { title: 'Character & Conduct Certificate', desc: 'Official testimonial from Dean of Student Affairs verifying exemplary conduct.', time: '3 Business Days' },
        ].map((c, i) => (
          <div key={i} className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs space-y-3 flex flex-col justify-between">
            <div>
              <div className="p-2.5 bg-indigo-50 text-indigo-700 rounded-xl w-fit mb-3">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">{c.title}</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{c.desc}</p>
            </div>
            <span className="text-[10px] text-slate-400 font-medium">Processing Time: {c.time}</span>
          </div>
        ))}
      </div>

      {/* Requests History Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900">Certificate Request Tracker</h3>
          <span className="text-xs text-slate-400">{requests.length} Requests on Record</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-100">
              <tr>
                <th className="p-4">Reference No.</th>
                <th className="p-4">Certificate Type</th>
                <th className="p-4">Application Purpose</th>
                <th className="p-4">Date Applied</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {requests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-4 font-mono font-bold text-slate-800">
                    {req.referenceNumber || req.id}
                  </td>
                  <td className="p-4 font-bold text-slate-900">{req.certificateType}</td>
                  <td className="p-4 max-w-xs truncate text-slate-700" title={req.purpose}>{req.purpose}</td>
                  <td className="p-4">{req.appliedDate}</td>
                  <td className="p-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                        req.status === 'Approved'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    {req.status === 'Approved' ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => setSelectedDownloadCert(req)}
                        className="text-[11px] py-1 px-2.5 gap-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </Button>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">In Process</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Request Modal */}
      {isRequestModalOpen && (
        <Modal
          isOpen={isRequestModalOpen}
          onClose={() => setIsRequestModalOpen(false)}
          title="Request Official Academic Certificate"
          description="Documents are stamped with digitally verifiable QR signatures"
          maxWidth="md"
        >
          <form onSubmit={handleApplyCertificate} className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-slate-700 block mb-1">Certificate Type</label>
              <select
                value={certType}
                onChange={(e) => setCertType(e.target.value as CertificateRequest['certificateType'])}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs bg-white"
              >
                <option value="Bonafide Certificate">Bonafide Certificate</option>
                <option value="Study Certificate">Study &amp; Medium of Instruction Certificate</option>
                <option value="Conduct Certificate">Character &amp; Conduct Testimonial</option>
                <option value="Fee Estimation Letter">Tuition Fee Estimation Letter (For Bank / Loan)</option>
              </select>
            </div>

            <div>
              <label className="font-semibold text-slate-700 block mb-1">Purpose of Request</label>
              <textarea
                rows={3}
                required
                placeholder="State organization, visa requirement, or scholarship application..."
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-slate-900 focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsRequestModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
              >
                Submit Request
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Official Certificate Download Modal */}
      {selectedDownloadCert && (
        <Modal
          isOpen={!!selectedDownloadCert}
          onClose={() => setSelectedDownloadCert(null)}
          title="Official Certified Document Preview"
          description={`Reference: ${selectedDownloadCert.referenceNumber}`}
          maxWidth="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-8 rounded-2xl bg-white border-2 border-slate-300 shadow-inner space-y-6 text-center">
              <div className="border-b-2 border-slate-900 pb-4">
                <h3 className="font-serif font-bold text-lg text-slate-900 tracking-wider uppercase">
                  CAMPUSONE UNIVERSITY OF ARTS &amp; TECHNOLOGY
                </h3>
                <p className="text-[11px] text-slate-500 tracking-widest uppercase">Office of the University Registrar</p>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-base text-slate-900 uppercase underline decoration-2">
                  {selectedDownloadCert.certificateType}
                </h4>
                <p className="text-slate-700 leading-relaxed text-xs text-justify">
                  This is to officially certify that <strong className="text-slate-950 font-bold">Merna Vance</strong>, holding Student Identification Number <strong className="font-mono text-slate-950">UTP-2023-4182</strong>, is a bonafide full-time undergraduate student currently enrolled in Semester 3 of the <strong className="text-slate-950">Bachelor of Science in Interactive Design &amp; Digital Media</strong> program at CampusOne University for the Academic Year 2023 - 2024.
                </p>
                <p className="text-slate-700 leading-relaxed text-xs text-justify">
                  To the best of our knowledge, her conduct and academic progress have been exemplary throughout her study period. This certificate is issued upon her request for the purpose of: <strong className="text-slate-900 font-semibold">{selectedDownloadCert.purpose}</strong>.
                </p>
              </div>

              <div className="pt-8 flex items-center justify-between border-t border-slate-200 text-left text-[11px]">
                <div>
                  <span className="font-mono text-slate-400 block text-[10px]">Verification Code</span>
                  <span className="font-mono font-bold text-slate-800">{selectedDownloadCert.referenceNumber}</span>
                </div>
                <div className="text-right">
                  <span className="font-serif italic font-bold text-slate-900 block">Dr. William Hargrove</span>
                  <span className="text-[10px] text-slate-500">Registrar &amp; Secretary to the Academic Council</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedDownloadCert(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  toast('Downloading official PDF certificate...', 'success');
                  window.print();
                }}
                className="gap-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Official Certificate</span>
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};
