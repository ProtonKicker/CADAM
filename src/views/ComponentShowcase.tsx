/**
 * Component Showcase for CADAM i18n Testing
 * 
 * A demo page to preview all translated UI components.
 * Buttons are non-functional - for visual testing only.
 * 
 * @author Lingma - AI coding assistant
 * @project CADAM - Open Source Text to CAD Web App
 */

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Slider } from '@/components/ui/slider';
import { Textarea } from '@/components/ui/textarea';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Globe,
  Settings,
  User,
  Mail,
  Lock,
  Download,
  Share,
  Edit,
  Trash,
  Plus,
  Search,
  Menu,
  X,
  Check,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { LanguageSelector } from '@/components/ui/LanguageSelector';

export default function ComponentShowcase() {
  const { t } = useTranslation();
  const [showDialog, setShowDialog] = useState(false);
  const [switchChecked, setSwitchChecked] = useState(false);
  const [selectedValue, setSelectedValue] = useState('');
  const [sliderValue, setSliderValue] = useState([50]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  return (
    <div className="min-h-screen bg-adam-bg-dark p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-adam-neutral-700 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">
              🎨 CADAM Component Showcase
            </h1>
            <p className="text-gray-300">
              Interactive demo of all translated UI components
            </p>
          </div>
          <LanguageSelector />
        </div>

        {/* Navigation Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Menu className="w-6 h-6" />
            Navigation & Actions
          </h2>
          <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">Buttons</CardTitle>
              <CardDescription className="text-gray-400">
                Various button styles and states
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-4">
                <Button variant="default">{t('buttons.continue')}</Button>
                <Button variant="secondary">{t('buttons.cancel')}</Button>
                <Button variant="destructive">{t('buttons.delete')}</Button>
                <Button variant="outline">{t('buttons.edit')}</Button>
                <Button variant="ghost">{t('buttons.share')}</Button>
                <Button variant="link">{t('buttons.learnMore')}</Button>
              </div>
              <div className="flex flex-wrap gap-4">
                <Button disabled>{t('loading.loading')}</Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  {t('navigation.newCreation')}
                </Button>
                <Button variant="destructive">
                  <Trash className="w-4 h-4 mr-2" />
                  {t('settings.deleteAccount')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Authentication Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Lock className="w-6 h-6" />
            Authentication Forms
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Sign In Form */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {t('auth.signIn')}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t('auth.enterEmail')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-300">
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white0" />
                    <Input
                      id="email"
                      placeholder={t('placeholders.enterEmail')}
                      className="pl-10 bg-adam-bg-dark border-adam-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-white0" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={t('placeholders.enterPassword')}
                      className="pl-10 bg-adam-bg-dark border-adam-neutral-700 text-white"
                    />
                  </div>
                </div>
                <Button className="w-full">{t('auth.signIn')}</Button>
                <p className="text-xs text-center text-gray-400">
                  {t('auth.forgotPassword')}
                </p>
              </CardContent>
            </Card>

            {/* Sign Up Form */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {t('auth.signUp')}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t('auth.dontHaveAccount')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullname" className="text-gray-300">
                    {t('auth.fullName')}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-4 h-4 text-white0" />
                    <Input
                      id="fullname"
                      placeholder={t('placeholders.enterFullName')}
                      className="pl-10 bg-adam-bg-dark border-adam-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-gray-300">
                    {t('auth.email')}
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-white0" />
                    <Input
                      id="signup-email"
                      placeholder={t('placeholders.enterEmail')}
                      className="pl-10 bg-adam-bg-dark border-adam-neutral-700 text-white"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-gray-300">
                    {t('auth.password')}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-white0" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={t('placeholders.confirmPassword')}
                      className="pl-10 bg-adam-bg-dark border-adam-neutral-700 text-white"
                    />
                  </div>
                </div>
                <Button className="w-full">{t('auth.createAccount')}</Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Settings Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Settings & Controls
          </h2>
          <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('settings.notifications')}
              </CardTitle>
              <CardDescription className="text-gray-400">
                {t('settings.notificationsDescription')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-gray-300">
                    {t('settings.responses')}
                  </Label>
                  <p className="text-sm text-gray-400">
                    {t('settings.notificationsDescription')}
                  </p>
                </div>
                <Switch
                  checked={switchChecked}
                  onCheckedChange={setSwitchChecked}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-gray-300">
                  {t('viewer.brightness')}
                </Label>
                <Slider
                  value={sliderValue}
                  onValueChange={setSliderValue}
                  max={100}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-400">
                  <span>0%</span>
                  <span>{sliderValue[0]}%</span>
                  <span>100%</span>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-gray-300">
                  {t('viewer.lighting')}
                </Label>
                <Select value={selectedValue} onValueChange={setSelectedValue}>
                  <SelectTrigger className="bg-adam-bg-dark border-adam-neutral-700 text-white">
                    <SelectValue placeholder="Select lighting preset" />
                  </SelectTrigger>
                  <SelectContent className="bg-adam-bg-secondary-dark border-adam-neutral-700">
                    <SelectItem value="studio">Studio Lighting</SelectItem>
                    <SelectItem value="soft">Soft Lighting</SelectItem>
                    <SelectItem value="dramatic">Dramatic</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Status & Feedback */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Info className="w-6 h-6" />
            Status & Feedback
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Progress */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {t('subscriptions.feature1')}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Token usage progress
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">
                      {t('settings.subscriptionTokens')}
                    </span>
                    <span className="text-gray-400">750 / 1000</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">Generating...</span>
                    <span className="text-gray-400">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Badges */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">Badges</CardTitle>
                <CardDescription className="text-gray-400">
                  Status indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="default">Default</Badge>
                  <Badge variant="secondary">{t('subscriptions.planStandard')}</Badge>
                  <Badge variant="destructive">Pro</Badge>
                  <Badge variant="outline">{t('subscriptions.planFree')}</Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Badge>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t('misc.success')}
                  </Badge>
                  <Badge variant="destructive">
                    <XCircle className="w-3 h-3 mr-1" />
                    {t('errors.error')}
                  </Badge>
                  <Badge>
                    <AlertCircle className="w-3 h-3 mr-1" />
                    Warning
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Dialogs & Modals */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <AlertCircle className="w-6 h-6" />
            Dialogs & Modals
          </h2>
          <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('deleteAccount.confirmTitle')}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Click to preview dialog
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={() => setShowDialog(true)} variant="destructive">
                {t('settings.deleteAccount')}
              </Button>
            </CardContent>
          </Card>

          <Dialog open={showDialog} onOpenChange={setShowDialog}>
            <DialogContent className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <DialogHeader>
                <DialogTitle className="text-white">
                  {t('deleteAccount.sad')}
                </DialogTitle>
                <DialogDescription className="text-gray-400">
                  {t('deleteAccount.confirmDescription')}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2 py-4">
                <p className="text-sm text-gray-300">
                  • {t('deleteAccount.permanentWarning')}
                </p>
                <p className="text-sm text-gray-300">
                  • {t('deleteAccount.dataRetentionWarning')}
                </p>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowDialog(false)}>
                  {t('buttons.cancel')}
                </Button>
                <Button variant="destructive" onClick={() => setShowDialog(false)}>
                  {t('buttons.delete')}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </section>

        {/* Subscription Cards */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Download className="w-6 h-6" />
            Subscription Plans
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Free Plan */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {t('subscriptions.planFree')}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t('subscriptions.planFreeDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">
                  {t('subscriptions.priceFree')}
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.feature1')}
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.feature2')}
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.feature3')}
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  {t('subscriptions.currentPlan')}
                </Button>
              </CardContent>
            </Card>

            {/* Standard Plan */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700 relative">
              <div className="absolute top-4 right-4">
                <Badge>{t('subscriptions.mostPopular')}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-white">
                  {t('subscriptions.planStandard')}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t('subscriptions.planStandardDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">
                  {t('subscriptions.priceStandard')}
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.featureStandard1')}
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.featureStandard2')}
                  </li>
                </ul>
                <Button className="w-full">
                  {t('subscriptions.getStandard')}
                </Button>
              </CardContent>
            </Card>

            {/* Pro Plan */}
            <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
              <CardHeader>
                <CardTitle className="text-white">
                  {t('subscriptions.planPro')}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {t('subscriptions.planProDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-white">
                  {t('subscriptions.pricePro')}
                </div>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.featurePro1')}
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.featurePro2')}
                  </li>
                  <li className="flex items-center">
                    <Check className="w-4 h-4 mr-2 text-green-500" />
                    {t('subscriptions.featurePro3')}
                  </li>
                </ul>
                <Button className="w-full" variant="destructive">
                  {t('subscriptions.getPro')}
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Editor Components */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Edit className="w-6 h-6" />
            Editor Interface
          </h2>
          <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('editor.quadTopology')}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Topology controls
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-gray-300">
                    {t('editor.quadTopology')}
                  </Label>
                  <p className="text-sm text-gray-400">
                    {t('editor.quadTopologyEnabled')}
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Share className="w-4 h-4 mr-2" />
                  {t('editor.share')}
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {t('download.title')}
                </Button>
                <Button variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  {t('buttons.regenerate')}
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Data Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Table className="w-6 h-6" />
            Data Display
          </h2>
          <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('history.title')}
              </CardTitle>
              <CardDescription className="text-gray-400">
                Recent conversations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-adam-neutral-700">
                    <TableHead className="text-gray-300">Name</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Date</TableHead>
                    <TableHead className="text-gray-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-adam-neutral-700">
                    <TableCell className="text-gray-300">Parametric Gear</TableCell>
                    <TableCell>
                      <Badge variant="default">Active</Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">2026-04-02</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-adam-neutral-700">
                    <TableCell className="text-gray-300">Phone Stand</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Completed</Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">2026-04-01</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow className="border-adam-neutral-700">
                    <TableCell className="text-gray-300">Custom Bracket</TableCell>
                    <TableCell>
                      <Badge variant="outline">Draft</Badge>
                    </TableCell>
                    <TableCell className="text-gray-400">2026-03-31</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </section>

        {/* Tabs Example */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Menu className="w-6 h-6" />
            Tabbed Interface
          </h2>
          <Card className="bg-adam-bg-secondary-dark border-adam-neutral-700">
            <CardHeader>
              <CardTitle className="text-white">
                {t('history.listView')} / {t('history.visualView')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="list" className="w-full">
                <TabsList className="bg-adam-neutral-800">
                  <TabsTrigger value="list">{t('history.listView')}</TabsTrigger>
                  <TabsTrigger value="visual">{t('history.visualView')}</TabsTrigger>
                </TabsList>
                <TabsContent value="list" className="mt-4">
                  <div className="space-y-2">
                    <div className="p-4 bg-adam-bg-dark rounded-lg">
                      <h3 className="text-gray-300">Conversation 1</h3>
                      <p className="text-sm text-gray-400">Last edited 2 hours ago</p>
                    </div>
                    <div className="p-4 bg-adam-bg-dark rounded-lg">
                      <h3 className="text-gray-300">Conversation 2</h3>
                      <p className="text-sm text-gray-400">Last edited yesterday</p>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="visual" className="mt-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="aspect-square bg-adam-neutral-800 rounded-lg flex items-center justify-center">
                      <span className="text-white0">Preview 1</span>
                    </div>
                    <div className="aspect-square bg-adam-neutral-800 rounded-lg flex items-center justify-center">
                      <span className="text-white0">Preview 2</span>
                    </div>
                    <div className="aspect-square bg-adam-neutral-800 rounded-lg flex items-center justify-center">
                      <span className="text-white0">Preview 3</span>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </section>

        {/* Footer */}
        <div className="border-t border-adam-neutral-700 pt-6 text-center">
          <p className="text-gray-400">
            🤖 Implemented by <strong>Lingma</strong> - AI coding assistant
          </p>
          <p className="text-sm text-white0 mt-2">
            For CADAM - Open Source Text to CAD Web App
          </p>
        </div>
      </div>
    </div>
  );
}
