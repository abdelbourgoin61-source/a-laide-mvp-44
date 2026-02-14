import { Download, Mail, Printer, FileText } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { invoices } from '../lib/data';

interface InvoicesProps {
  onBack: () => void;
}

export function Invoices({ onBack }: InvoicesProps) {
  const handleDownload = (invoiceId: string) => {
    alert(`Downloading invoice ${invoiceId}...`);
  };

  const handleEmail = (invoiceId: string) => {
    alert(`Sending invoice ${invoiceId} by email...`);
  };

  const handlePrint = (invoiceId: string) => {
    alert(`Printing invoice ${invoiceId}...`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 hover:bg-green-100';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100';
      case 'unpaid':
        return 'bg-red-100 text-red-800 hover:bg-red-100';
      default:
        return 'bg-slate-100 text-slate-800 hover:bg-slate-100';
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button 
          variant="ghost" 
          onClick={onBack}
          className="mb-6"
        >
          ← Back
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
            Invoices & Billing
          </h1>
          <p className="text-slate-600">
            View and manage all your invoices and payment history
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Invoices</span>
              <FileText className="h-5 w-5 text-slate-400" />
            </div>
            <div className="text-3xl font-bold text-slate-900">{invoices.length}</div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Total Paid</span>
              <div className="h-3 w-3 rounded-full bg-green-500" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              €{invoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.totalAmount, 0)}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-600">Platform Revenue</span>
              <div className="h-3 w-3 rounded-full bg-[#fda4af]" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              €{invoices.reduce((sum, i) => sum + i.platformCommission, 0)}
            </div>
          </Card>
        </div>

        {/* Invoices List */}
        <div className="space-y-4">
          {invoices.map((invoice) => (
            <Card key={invoice.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Invoice Info */}
                <div className="flex-grow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-slate-900">
                          {invoice.id}
                        </h3>
                        <Badge className={getStatusColor(invoice.status)}>
                          {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                        </Badge>
                      </div>
                      <p className="text-slate-600">
                        {invoice.serviceType}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900">
                        €{invoice.totalAmount}
                      </div>
                      <div className="text-sm text-slate-600">
                        {new Date(invoice.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Details Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-slate-50 rounded-lg">
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Provider</div>
                      <div className="font-medium text-slate-900">
                        {invoice.providerName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Customer</div>
                      <div className="font-medium text-slate-900">
                        {invoice.customerName}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Provider Amount</div>
                      <div className="font-medium text-green-600">
                        €{invoice.providerAmount}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Commission (18%)</div>
                      <div className="font-medium text-[#fda4af]">
                        €{invoice.platformCommission}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={() => handleDownload(invoice.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:text-[#ff6e14] hover:border-[#ff6e14]"
                    >
                      <Download className="h-4 w-4" />
                      Télécharger PDF
                    </Button>
                    <Button
                      onClick={() => handleEmail(invoice.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:text-[#ff6e14] hover:border-[#ff6e14]"
                    >
                      <Mail className="h-4 w-4" />
                      Envoyer par email
                    </Button>
                    <Button
                      onClick={() => handlePrint(invoice.id)}
                      variant="outline"
                      size="sm"
                      className="gap-2 hover:text-[#ff6e14] hover:border-[#ff6e14]"
                    >
                      <Printer className="h-4 w-4" />
                      Imprimer
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Contract Information */}
        <Card className="p-8 mt-8 bg-slate-100 border-slate-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-4">
            Dual Contractual System
          </h2>
          <div className="space-y-3 text-slate-700">
            <p>
              <strong>Provider ↔ Platform:</strong> Service providers sign an agreement with Help platform, 
              agreeing to a 18% commission on all completed services.
            </p>
            <p>
              <strong>Client ↔ Service Provider:</strong> Direct contract between client and provider 
              for specific services. The platform facilitates the connection and handles payments.
            </p>
            <p className="text-sm text-slate-600 mt-4">
              All invoices are automatically generated after service completion and digital signature. 
              Payments are processed securely through our platform.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
