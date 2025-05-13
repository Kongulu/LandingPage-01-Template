import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart, ArrowRight, Globe, Code, Database, Server, Link,
  CheckCircle, XCircle, AlertTriangle, Layers, Settings, ExternalLink
} from 'lucide-react';
import { feedback } from './FeedbackSystem';

type ProjectStatus = 'online' | 'offline' | 'warning';
type ProjectType = 'website' | 'service' | 'api' | 'database';

interface Project {
  id: string;
  name: string;
  url: string;
  status: ProjectStatus;
  type: ProjectType;
  lastDeployed: string;
  metrics: {
    visitors: number;
    uptime: number;
    responseTime: number;
  };
}

// Example project data
const projectsData: Project[] = [
  {
    id: "node12-website",
    name: "Node12.com Website",
    url: "https://node12.com",
    status: "online",
    type: "website",
    lastDeployed: "2023-05-10",
    metrics: {
      visitors: 1243,
      uptime: 99.8,
      responseTime: 180,
    }
  },
  {
    id: "bookmark-converter",
    name: "Bookmark Converter",
    url: "https://bookmarkconverter.replit.app",
    status: "online",
    type: "service",
    lastDeployed: "2023-05-12",
    metrics: {
      visitors: 852,
      uptime: 99.9,
      responseTime: 210,
    }
  },
  {
    id: "node12-api",
    name: "Node12 API",
    url: "https://api.node12.com",
    status: "warning",
    type: "api",
    lastDeployed: "2023-05-08",
    metrics: {
      visitors: 3402,
      uptime: 98.2,
      responseTime: 320,
    }
  },
  {
    id: "node12-db",
    name: "Node12 Database",
    url: "postgresql://node12-db.replit.app",
    status: "offline",
    type: "database",
    lastDeployed: "2023-05-05",
    metrics: {
      visitors: 0,
      uptime: 92.5,
      responseTime: 450,
    }
  }
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'projects' | 'analytics'>('overview');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const getStatusIcon = (status: ProjectStatus) => {
    switch (status) {
      case 'online':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'offline':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
    }
  };
  
  const getTypeIcon = (type: ProjectType) => {
    switch (type) {
      case 'website':
        return <Globe className="h-5 w-5" />;
      case 'service':
        return <Server className="h-5 w-5" />;
      case 'api':
        return <Code className="h-5 w-5" />;
      case 'database':
        return <Database className="h-5 w-5" />;
    }
  };
  
  const handleProjectAction = (action: string, project: Project) => {
    switch (action) {
      case 'restart':
        feedback.info(`Restarting ${project.name}...`);
        setTimeout(() => {
          feedback.success(`${project.name} has been restarted!`);
        }, 2000);
        break;
      case 'deploy':
        feedback.info(`Deploying ${project.name}...`);
        setTimeout(() => {
          feedback.success(`${project.name} has been deployed!`);
        }, 3000);
        break;
      case 'settings':
        setSelectedProject(project);
        feedback.info(`Opened settings for ${project.name}`);
        break;
      default:
        break;
    }
  };
  
  const renderOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Project Status</h3>
        <div className="space-y-4">
          {projectsData.map(project => (
            <div key={project.id} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
              <div className="flex items-center">
                <div className="mr-3">
                  {getTypeIcon(project.type)}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-gray-100">{project.name}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{project.url}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="mr-2">
                  {getStatusIcon(project.status)}
                </span>
                <span className={`text-sm ${
                  project.status === 'online' ? 'text-green-600 dark:text-green-400' :
                  project.status === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                  'text-red-600 dark:text-red-400'
                }`}>
                  {project.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Quick Stats</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Projects</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">{projectsData.length}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Online Projects</p>
            <p className="text-2xl font-semibold text-green-600 dark:text-green-400">
              {projectsData.filter(p => p.status === 'online').length}
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Avg. Uptime</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {(projectsData.reduce((sum, p) => sum + p.metrics.uptime, 0) / projectsData.length).toFixed(1)}%
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Visitors</p>
            <p className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
              {projectsData.reduce((sum, p) => sum + p.metrics.visitors, 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderProjects = () => (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow">
        <thead className="bg-gray-50 dark:bg-gray-700">
          <tr>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Project</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Deployed</th>
            <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {projectsData.map(project => (
            <tr key={project.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
              <td className="py-4 px-4">
                <div>
                  <div className="font-medium text-gray-900 dark:text-gray-100">{project.name}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center hover:text-primary">
                      {project.url}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <span className="mr-2">{getTypeIcon(project.type)}</span>
                  <span className="capitalize">{project.type}</span>
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex items-center">
                  <span className="mr-2">{getStatusIcon(project.status)}</span>
                  <span className={`capitalize ${
                    project.status === 'online' ? 'text-green-600 dark:text-green-400' :
                    project.status === 'warning' ? 'text-yellow-600 dark:text-yellow-400' :
                    'text-red-600 dark:text-red-400'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-500 dark:text-gray-400">
                {project.lastDeployed}
              </td>
              <td className="py-4 px-4">
                <div className="flex space-x-2">
                  <button 
                    onClick={() => handleProjectAction('restart', project)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Restart"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleProjectAction('settings', project)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Settings"
                  >
                    <Settings className="h-5 w-5" />
                  </button>
                  <button 
                    onClick={() => handleProjectAction('deploy', project)}
                    className="p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300"
                    title="Deploy"
                  >
                    <Layers className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
  
  const renderAnalytics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Visitor Metrics</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-end h-52 space-x-4">
            {projectsData.map((project, index) => (
              <div key={project.id} className="flex flex-col items-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(project.metrics.visitors / 3500) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`w-12 rounded-t-md ${
                    project.type === 'website' ? 'bg-blue-500' :
                    project.type === 'service' ? 'bg-green-500' :
                    project.type === 'api' ? 'bg-purple-500' :
                    'bg-orange-500'
                  }`}
                />
                <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center max-w-[80px] truncate">
                  {project.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-3">Response Time (ms)</h3>
        <div className="h-64 flex items-center justify-center">
          <div className="flex items-end h-52 space-x-4">
            {projectsData.map((project, index) => (
              <div key={project.id} className="flex flex-col items-center">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: `${(project.metrics.responseTime / 500) * 100}%` }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`w-12 rounded-t-md ${
                    project.metrics.responseTime < 200 ? 'bg-green-500' :
                    project.metrics.responseTime < 350 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                />
                <div className="mt-2 text-xs font-medium text-gray-600 dark:text-gray-400 text-center">
                  {project.metrics.responseTime}ms
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderProjectSettings = () => {
    if (!selectedProject) return null;
    
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      >
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
          <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 p-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {selectedProject.name} Settings
            </h3>
            <button 
              onClick={() => setSelectedProject(null)}
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={selectedProject.name}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project URL
                </label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={selectedProject.url}
                  readOnly
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Type
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={selectedProject.type}
                  disabled
                >
                  <option value="website">Website</option>
                  <option value="service">Service</option>
                  <option value="api">API</option>
                  <option value="database">Database</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Status
                </label>
                <select 
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  value={selectedProject.status}
                  disabled
                >
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="warning">Warning</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Project Connection</h4>
              <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Link className="h-5 w-5 text-gray-500 dark:text-gray-400 mr-2" />
                    <span className="text-sm text-gray-700 dark:text-gray-300">Connected Projects</span>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {projectsData.length - 1}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-2">Project Metrics</h4>
              <div className="space-y-3">
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Visitors</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {selectedProject.metrics.visitors.toLocaleString()}
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Uptime</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {selectedProject.metrics.uptime}%
                    </span>
                  </div>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 p-3 rounded-md">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Response Time</span>
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {selectedProject.metrics.responseTime}ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end space-x-3">
              <button 
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button 
                onClick={() => {
                  feedback.success(`${selectedProject.name} settings updated!`);
                  setSelectedProject(null);
                }}
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  };
  
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
          <BarChart className="mr-2 h-6 w-6 text-primary" />
          Admin Dashboard
        </h2>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'overview'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab('projects')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'projects'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:border-gray-600'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>
        
        <div className="py-4">
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'projects' && renderProjects()}
          {activeTab === 'analytics' && renderAnalytics()}
        </div>
      </div>
      
      {selectedProject && renderProjectSettings()}
    </div>
  );
}