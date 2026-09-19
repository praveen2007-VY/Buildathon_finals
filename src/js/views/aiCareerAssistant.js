// AI Career Assistant View - Connected to n8n Backend API
// Adheres strictly to TalentPulse design language, tokens, and dashboard aesthetics

import { store, userProfile, activeUser, targetOpportunity } from '../data.js';
import { sendCareerAssistantMessage } from '../../services/careerAssistantApi.js';

export function renderAiCareerAssistantView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in" id="aiCareerAssistantView">
      <!-- Top Header & Context Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] uppercase tracking-wider font-semibold">
              <span class="material-symbols-outlined text-sm text-secondary">auto_awesome</span>
              AI Career Insights
            </span>
            <span class="text-outline">•</span>
            <div class="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
              <span class="relative flex h-2 w-2">
                <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-fixed-dim opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span>Online • TalentPulse Neural Copilot v2.8</span>
            </div>
          </div>
          <h1 class="font-display text-2xl font-bold text-on-surface tracking-tight">AI Career Assistant</h1>
          <p class="text-xs text-on-surface-variant max-w-2xl">
            Your intelligent career copilot for skills, opportunities, learning, and internal mobility.
          </p>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-3 self-start md:self-auto">
          <button 
            id="newChatBtn" 
            class="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white border border-surface-container text-on-surface text-xs font-semibold hover:bg-surface-container-low hover:border-primary/40 transition-all shadow-xs group"
            title="Start fresh conversation"
          >
            <span class="material-symbols-outlined text-base text-primary transition-transform group-hover:rotate-180 duration-500">refresh</span>
            <span>New Chat</span>
          </button>
        </div>
      </div>

      <!-- Main Layout Grid: Chat Area (approx 70%) & Right Insight Panel (approx 30%) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        <!-- LEFT: Main Chat Area (8 Cols / approx 70%) -->
        <div class="lg:col-span-8 flex flex-col">
          <div class="bg-white rounded-2xl border border-surface-container shadow-xs flex flex-col justify-between overflow-hidden min-h-[720px]">
            
            <!-- Chat Card Header -->
            <div class="flex items-center justify-between px-6 py-4 border-b border-surface-container bg-surface-container-lowest/80 backdrop-blur-sm">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#16A765] to-[#4648D4] text-white flex items-center justify-center shadow-xs">
                  <span class="material-symbols-outlined text-xl">auto_awesome</span>
                </div>
                <div class="flex flex-col">
                  <div class="flex items-center gap-2">
                    <span class="font-display text-sm font-bold text-on-surface">TalentPulse Career Copilot</span>
                    <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-fixed/60 text-[#006D3F] text-[10px] font-semibold">
                      <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                      Online
                    </span>
                  </div>
                  <span class="text-[11px] text-outline line-clamp-1">
                    AI-powered career guidance based on your skills, profile, learning progress and internal opportunities.
                  </span>
                </div>
              </div>

              <!-- Menu Button & Dropdown -->
              <div class="relative">
                <button 
                  id="chatMenuBtn" 
                  class="p-2 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container-low transition-colors"
                  title="Chat Options"
                >
                  <span class="material-symbols-outlined text-lg">more_vert</span>
                </button>
                <div 
                  id="chatMenuDropdown" 
                  class="hidden absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-lg border border-surface-container p-1.5 z-20"
                >
                  <button id="menuClearChat" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low rounded-lg transition-colors text-left">
                    <span class="material-symbols-outlined text-sm text-outline">delete_sweep</span>
                    Clear Conversation
                  </button>
                  <button id="menuExportChat" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low rounded-lg transition-colors text-left">
                    <span class="material-symbols-outlined text-sm text-outline">download</span>
                    Export Summary
                  </button>
                  <div class="h-px bg-surface-container my-1"></div>
                  <button id="menuPromptLibrary" class="w-full flex items-center gap-2 px-3 py-2 text-xs text-on-surface hover:bg-surface-container-low rounded-lg transition-colors text-left">
                    <span class="material-symbols-outlined text-sm text-secondary">psychology</span>
                    Prompt Library
                  </button>
                </div>
              </div>
            </div>

            <!-- Messages Scroll Area -->
            <div class="flex-1 overflow-y-auto p-6 flex flex-col gap-6 max-h-[580px]" id="chatFeedContainer">
              
              <!-- 1. Initial AI Greeting & Introduction Message -->
              <div class="flex items-start gap-3.5 animate-fade-in" id="initialAiMessageBlock">
                <div class="w-8 h-8 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                  <span class="material-symbols-outlined text-base text-secondary">smart_toy</span>
                </div>
                <div class="flex-1 max-w-3xl flex flex-col gap-3">
                  <div class="bg-surface-container-low/70 rounded-2xl rounded-tl-sm p-4 border border-surface-container text-on-surface text-xs leading-relaxed shadow-2xs">
                    <div class="flex items-center justify-between mb-2 pb-2 border-b border-surface-container/60">
                      <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-on-surface">TalentPulse Career Copilot</span>
                        <span class="text-[10px] text-outline">• System Ready</span>
                      </div>
                      <span class="text-[10px] px-2 py-0.5 rounded bg-white text-outline font-semibold border border-surface-container">Verified Profile</span>
                    </div>
                    <p class="font-semibold text-on-surface mb-2">Good morning, Alex 👋</p>
                    <p class="text-on-surface-variant leading-relaxed">
                      I'm your TalentPulse Career Copilot. I can help you understand your current skill profile, identify skill gaps, discover internal opportunities, create a learning plan, and prepare for your next career move.
                    </p>
                    <p class="text-on-surface font-semibold mt-2.5">
                      What would you like to explore today?
                    </p>
                  </div>

                  <!-- 6 Quick Action Suggestion Cards -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-1" id="quickActionsGrid">
                    <!-- Action 1 -->
                    <button 
                      class="quick-action-card p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:border-primary/50 border border-surface-container text-left transition-all group flex flex-col justify-between gap-2 shadow-2xs cursor-pointer"
                      data-prompt="What skills should I improve?"
                    >
                      <div class="flex items-center justify-between">
                        <div class="w-7 h-7 rounded-lg bg-primary-fixed/50 text-primary flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">target</span>
                        </div>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                      </div>
                      <span class="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                        What skills should I improve?
                      </span>
                    </button>

                    <!-- Action 2 -->
                    <button 
                      class="quick-action-card p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:border-secondary/50 border border-surface-container text-left transition-all group flex flex-col justify-between gap-2 shadow-2xs cursor-pointer"
                      data-prompt="Find roles matching my profile"
                    >
                      <div class="flex items-center justify-between">
                        <div class="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">work</span>
                        </div>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-secondary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                      </div>
                      <span class="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                        Find roles matching my profile
                      </span>
                    </button>

                    <!-- Action 3 -->
                    <button 
                      class="quick-action-card p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:border-primary/50 border border-surface-container text-left transition-all group flex flex-col justify-between gap-2 shadow-2xs cursor-pointer"
                      data-prompt="Show my skill gaps"
                    >
                      <div class="flex items-center justify-between">
                        <div class="w-7 h-7 rounded-lg bg-primary-fixed/50 text-primary flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">donut_large</span>
                        </div>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                      </div>
                      <span class="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                        Show my skill gaps
                      </span>
                    </button>

                    <!-- Action 4 -->
                    <button 
                      class="quick-action-card p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:border-secondary/50 border border-surface-container text-left transition-all group flex flex-col justify-between gap-2 shadow-2xs cursor-pointer"
                      data-prompt="Create my learning roadmap"
                    >
                      <div class="flex items-center justify-between">
                        <div class="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">school</span>
                        </div>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-secondary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                      </div>
                      <span class="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                        Create my learning roadmap
                      </span>
                    </button>

                    <!-- Action 5 -->
                    <button 
                      class="quick-action-card p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:border-primary/50 border border-surface-container text-left transition-all group flex flex-col justify-between gap-2 shadow-2xs cursor-pointer"
                      data-prompt="How can I prepare for promotion?"
                    >
                      <div class="flex items-center justify-between">
                        <div class="w-7 h-7 rounded-lg bg-primary-fixed/50 text-primary flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">trending_up</span>
                        </div>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                      </div>
                      <span class="text-xs font-semibold text-on-surface group-hover:text-primary transition-colors">
                        How can I prepare for promotion?
                      </span>
                    </button>

                    <!-- Action 6 -->
                    <button 
                      class="quick-action-card p-3 rounded-xl bg-surface-container-low/60 hover:bg-surface-container hover:border-secondary/50 border border-surface-container text-left transition-all group flex flex-col justify-between gap-2 shadow-2xs cursor-pointer"
                      data-prompt="Analyze my career trajectory"
                    >
                      <div class="flex items-center justify-between">
                        <div class="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center">
                          <span class="material-symbols-outlined text-base">timeline</span>
                        </div>
                        <span class="material-symbols-outlined text-sm text-outline group-hover:text-secondary group-hover:translate-x-0.5 transition-all">arrow_forward</span>
                      </div>
                      <span class="text-xs font-semibold text-on-surface group-hover:text-secondary transition-colors">
                        Analyze my career trajectory
                      </span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Dynamic Messages Appended Here -->
              <div id="dynamicMessagesFeed" class="flex flex-col gap-6"></div>

              <!-- Typing Indicator Container (Shown while waiting for n8n) -->
              <div id="aiTypingIndicator" class="hidden items-start gap-3.5 animate-fade-in">
                <div class="w-8 h-8 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-base text-secondary animate-spin">sync</span>
                </div>
                <div class="bg-white rounded-2xl rounded-tl-sm p-3.5 border border-surface-container shadow-xs flex items-center gap-2.5">
                  <span class="text-xs text-on-surface font-medium">TalentPulse AI is thinking...</span>
                  <div class="flex items-center gap-1">
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.2s]"></span>
                    <span class="w-1.5 h-1.5 rounded-full bg-primary animate-bounce [animation-delay:0.4s]"></span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Bottom Chat Input Section -->
            <div class="p-4 border-t border-surface-container bg-white">
              <form id="chatForm" class="flex flex-col gap-2">
                <div class="flex items-center bg-surface-container-low rounded-2xl p-1.5 border border-surface-container focus-within:border-primary/50 focus-within:bg-white focus-within:shadow-xs transition-all">
                  
                  <!-- Attachment Trigger -->
                  <button 
                    type="button" 
                    id="chatAttachBtn" 
                    class="p-2 text-outline hover:text-on-surface hover:bg-surface-container-high rounded-xl transition-colors" 
                    title="Attach file or resume"
                  >
                    <span class="material-symbols-outlined text-lg">attach_file</span>
                  </button>
                  <input type="file" id="hiddenChatFileInput" class="hidden" accept=".pdf,.doc,.docx,.txt" />

                  <!-- Voice / Microphone Toggle -->
                  <button 
                    type="button" 
                    id="chatVoiceBtn" 
                    class="p-2 text-outline hover:text-primary hover:bg-surface-container-high rounded-xl transition-colors relative" 
                    title="Voice dictation"
                  >
                    <span class="material-symbols-outlined text-lg" id="voiceIcon">mic</span>
                  </button>

                  <!-- Main Text Input -->
                  <input 
                    type="text" 
                    id="chatInput" 
                    placeholder="Ask anything about your career, skills, opportunities, or learning..." 
                    autocomplete="off"
                    class="w-full bg-transparent px-3 text-xs text-on-surface placeholder:text-outline focus:outline-none"
                  />

                  <!-- Send Button -->
                  <button 
                    type="submit" 
                    id="chatSendBtn" 
                    class="w-9 h-9 rounded-xl bg-primary hover:bg-primary/90 text-white flex items-center justify-center transition-all shadow-xs shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <span class="material-symbols-outlined text-base">send</span>
                  </button>
                </div>
                
                <!-- Disclaimer -->
                <p class="text-[11px] text-outline text-center">
                  TalentPulse AI can make mistakes. Verify important career or HR information.
                </p>
              </form>
            </div>

          </div>
        </div>

        <!-- RIGHT: Insight Panel (4 Cols / approx 30%) -->
        <div class="lg:col-span-4 flex flex-col gap-5">
          
          <!-- Card 1: Career Snapshot -->
          <div class="bg-white rounded-2xl p-5 shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-primary text-lg">donut_small</span>
                <h2 class="font-display text-sm font-bold text-on-surface">Career Snapshot</h2>
              </div>
              <span class="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                Q3 Active
              </span>
            </div>

            <!-- Compact 2x2 Metric Grid -->
            <div class="grid grid-cols-2 gap-2.5">
              <!-- Metric 1: AI Career Readiness -->
              <div class="p-3 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-1">
                <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">AI Career Readiness</span>
                <div class="flex items-baseline gap-1">
                  <span class="font-display text-2xl font-bold text-on-surface">88%</span>
                </div>
                <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-1">
                  <div class="bg-primary-container h-full rounded-full" style="width: 88%"></div>
                </div>
              </div>

              <!-- Metric 2: Skill Match Index -->
              <div class="p-3 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-1">
                <div class="flex items-center justify-between">
                  <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Skill Match</span>
                  <span class="text-[9px] font-bold text-primary flex items-center">
                    <span class="material-symbols-outlined text-[11px]">trending_up</span>+4.2%
                  </span>
                </div>
                <div class="flex items-baseline gap-1">
                  <span class="font-display text-2xl font-bold text-on-surface">94%</span>
                </div>
                <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-1">
                  <div class="bg-primary h-full rounded-full" style="width: 94%"></div>
                </div>
              </div>

              <!-- Metric 3: Learning Progress -->
              <div class="p-3 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-1">
                <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Learning Progress</span>
                <div class="flex items-baseline gap-1">
                  <span class="font-display text-2xl font-bold text-on-surface">77%</span>
                  <span class="text-[10px] text-outline">38.5/50h</span>
                </div>
                <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-1">
                  <div class="bg-secondary h-full rounded-full" style="width: 77%"></div>
                </div>
              </div>

              <!-- Metric 4: Mobility Matches -->
              <div class="p-3 rounded-xl bg-surface-container-low border border-surface-container flex flex-col justify-between gap-1">
                <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Mobility Matches</span>
                <div class="flex items-baseline gap-1">
                  <span class="font-display text-2xl font-bold text-on-surface">6</span>
                  <span class="text-[10px] text-primary font-semibold">3 High Fit</span>
                </div>
                <div class="w-full h-1.5 bg-surface-container-high rounded-full overflow-hidden mt-1">
                  <div class="bg-secondary-fixed-dim h-full rounded-full" style="width: 100%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 2: Top Skill Gaps -->
          <div class="bg-white rounded-2xl p-5 shadow-xs border border-surface-container flex flex-col gap-3.5">
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <span class="material-symbols-outlined text-secondary text-lg">bar_chart</span>
                <h2 class="font-display text-sm font-bold text-on-surface">Top Skill Gaps</h2>
              </div>
              <span class="text-[11px] text-outline font-medium">Target Benchmarks</span>
            </div>

            <!-- Horizontal Progress Bars -->
            <div class="flex flex-col gap-3">
              
              <!-- Gap 1 -->
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-on-surface font-medium">MLOps & LLM Orchestration</span>
                  <span class="font-bold text-secondary">64%</span>
                </div>
                <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div class="bg-secondary h-full rounded-full" style="width: 64%"></div>
                  <div class="bg-secondary/20 h-full" style="width: 21%"></div>
                </div>
              </div>

              <!-- Gap 2 -->
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-on-surface font-medium">System Architecture</span>
                  <span class="font-bold text-primary">71%</span>
                </div>
                <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div class="bg-primary h-full rounded-full" style="width: 71%"></div>
                  <div class="bg-primary/20 h-full" style="width: 17%"></div>
                </div>
              </div>

              <!-- Gap 3 -->
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-on-surface font-medium">Technical Leadership</span>
                  <span class="font-bold text-primary">69%</span>
                </div>
                <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div class="bg-primary-container h-full rounded-full" style="width: 69%"></div>
                  <div class="bg-primary-container/20 h-full" style="width: 13%"></div>
                </div>
              </div>

              <!-- Gap 4 -->
              <div class="flex flex-col gap-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-on-surface font-medium">Cloud Infrastructure</span>
                  <span class="font-bold text-primary">76%</span>
                </div>
                <div class="w-full h-2 bg-surface-container-high rounded-full overflow-hidden flex">
                  <div class="bg-primary h-full rounded-full" style="width: 76%"></div>
                  <div class="bg-primary/20 h-full" style="width: 14%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Card 3: Current Career Direction -->
          <div class="bg-white rounded-2xl p-5 shadow-xs border border-surface-container flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Current Career Direction</span>
              <span class="px-2 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-[10px] font-bold">
                Strong Match
              </span>
            </div>

            <div class="flex flex-col">
              <h3 class="font-display text-base font-bold text-on-surface">AI Solutions Architect</h3>
              <p class="text-xs text-on-surface-variant mt-1 leading-relaxed">
                Your current profile aligns strongly with architecture, AI infrastructure and technical leadership opportunities.
              </p>
            </div>

            <button 
              id="viewCareerPathBtn"
              class="w-full flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface text-xs font-semibold border border-surface-container hover:border-primary/40 transition-all shadow-2xs group cursor-pointer"
            >
              <span>View Career Path</span>
              <span class="material-symbols-outlined text-sm text-outline group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
            </button>
          </div>

          <!-- Card 4: Recent Insights -->
          <div class="bg-white rounded-2xl p-5 shadow-xs border border-surface-container flex flex-col gap-3">
            <div class="flex items-center justify-between">
              <h2 class="font-display text-sm font-bold text-on-surface">Recent Insights</h2>
              <span class="material-symbols-outlined text-outline text-lg">insights</span>
            </div>

            <div class="flex flex-col gap-2.5">
              <!-- Item 1 -->
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/60 border border-surface-container/70">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-primary-fixed/60 text-primary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-sm">trending_up</span>
                  </div>
                  <span class="text-xs text-on-surface font-medium">3 skills improved this month</span>
                </div>
                <span class="text-[10px] text-outline shrink-0 ml-2">2d ago</span>
              </div>

              <!-- Item 2 -->
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/60 border border-surface-container/70">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-sm">work</span>
                  </div>
                  <span class="text-xs text-on-surface font-medium">2 new internal roles match your profile</span>
                </div>
                <span class="text-[10px] text-outline shrink-0 ml-2">Yesterday</span>
              </div>

              <!-- Item 3 -->
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/60 border border-surface-container/70">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-sm">schedule</span>
                  </div>
                  <span class="text-xs text-on-surface font-medium">11.5 learning hours remaining</span>
                </div>
                <span class="text-[10px] text-primary font-semibold shrink-0 ml-2">On track</span>
              </div>

              <!-- Item 4 -->
              <div class="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/60 border border-surface-container/70">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                    <span class="material-symbols-outlined text-sm">workspace_premium</span>
                  </div>
                  <span class="text-xs text-on-surface font-medium">1 certification currently underway</span>
                </div>
                <span class="text-[10px] text-secondary font-semibold shrink-0 ml-2">In progress</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      <!-- MODAL 1: Learning Plan Modal -->
      <div id="learningPlanModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-surface-container flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center">
                <span class="material-symbols-outlined text-xl">school</span>
              </div>
              <div class="flex flex-col">
                <h3 class="font-display text-lg font-bold text-on-surface">Targeted Learning Plan: Senior AI Track</h3>
                <span class="text-xs text-outline">Tailored to close your MLOps and Architecture skill gaps</span>
              </div>
            </div>
            <button id="closeLearningModalBtn" class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <div class="flex flex-col gap-3">
            <!-- Stage 1 -->
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-start justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">1</div>
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-on-surface">MLOps & Production Model Deployment</span>
                  <span class="text-[11px] text-on-surface-variant mt-0.5">Hands-on pipeline orchestrations with Kubeflow, Triton Inference Server & MLflow.</span>
                  <span class="text-[10px] text-primary font-semibold mt-1">Estimated duration: 18 hours • 4 modules</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded bg-primary-fixed text-on-primary-fixed text-[10px] font-semibold shrink-0">Priority 1</span>
            </div>

            <!-- Stage 2 -->
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-start justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full bg-secondary text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">2</div>
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-on-surface">Enterprise Systems Architecture & Scalability</span>
                  <span class="text-[11px] text-on-surface-variant mt-0.5">Designing fault-tolerant microservices, event streaming with Apache Kafka, and SOC2 governance.</span>
                  <span class="text-[10px] text-secondary font-semibold mt-1">Estimated duration: 14 hours • 3 modules</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px] font-semibold shrink-0">Priority 2</span>
            </div>

            <!-- Stage 3 -->
            <div class="p-4 rounded-xl bg-surface-container-low border border-surface-container flex items-start justify-between gap-4">
              <div class="flex items-start gap-3">
                <div class="w-7 h-7 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">3</div>
                <div class="flex flex-col">
                  <span class="text-xs font-bold text-on-surface">Technical Executive Leadership</span>
                  <span class="text-[11px] text-on-surface-variant mt-0.5">Influencing cross-functional roadmaps, architectural review boards, and mentorship.</span>
                  <span class="text-[10px] text-outline font-semibold mt-1">Estimated duration: 8 hours • 2 modules</span>
                </div>
              </div>
              <span class="px-2 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px] font-semibold shrink-0">Priority 3</span>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-surface-container">
            <span class="text-xs text-outline">Total estimated time: <strong>40 learning hours</strong></span>
            <div class="flex items-center gap-2">
              <button id="cancelLearningModalBtn" class="px-4 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors">
                Cancel
              </button>
              <button id="enrollPlanBtn" class="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-semibold transition-all shadow-xs">
                Enroll in Fast-Track Program
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- MODAL 2: Career Path Progression Modal -->
      <div id="careerPathModal" class="hidden fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
        <div class="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-xl border border-surface-container flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center">
                <span class="material-symbols-outlined text-xl">timeline</span>
              </div>
              <div class="flex flex-col">
                <h3 class="font-display text-lg font-bold text-on-surface">Career Path Vector: AI Solutions Architect</h3>
                <span class="text-xs text-outline">Enterprise Mobility Roadmap for Alex Mercer</span>
              </div>
            </div>
            <button id="closeCareerModalBtn" class="p-1.5 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          <!-- Milestones Timeline -->
          <div class="flex flex-col gap-4 py-2">
            <!-- Stage 1 -->
            <div class="flex items-start gap-4 p-3.5 rounded-xl bg-surface-container-low border border-surface-container">
              <div class="w-8 h-8 rounded-full bg-primary-fixed text-primary flex items-center justify-center shrink-0 shadow-xs">
                <span class="material-symbols-outlined text-sm">check</span>
              </div>
              <div class="flex flex-col flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-on-surface">Principal Analyst (L5)</span>
                  <span class="px-2 py-0.5 rounded bg-primary text-white text-[10px] font-semibold">Current Role</span>
                </div>
                <p class="text-[11px] text-on-surface-variant mt-0.5">8 verified enterprise competencies • 98% peer score</p>
              </div>
            </div>

            <!-- Stage 2 -->
            <div class="flex items-start gap-4 p-3.5 rounded-xl bg-white shadow-xs border-l-4 border-l-primary border border-surface-container">
              <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center shrink-0 shadow-xs ring-4 ring-primary/20">
                <span class="material-symbols-outlined text-sm">rocket_launch</span>
              </div>
              <div class="flex flex-col flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-on-surface">Staff AI Solutions Architect (L6)</span>
                  <span class="text-[10px] font-bold text-primary">Target: Q4 2024 • 91% Ready</span>
                </div>
                <p class="text-[11px] text-on-surface-variant mt-0.5">Comp range: $185,000 – $215,000 • Requisition #ENG-9421</p>
                <div class="flex items-center gap-2 mt-2">
                  <span class="text-[10px] text-outline font-semibold">Hiring Lead: Rachel Vance (VP Engineering)</span>
                </div>
              </div>
            </div>

            <!-- Stage 3 -->
            <div class="flex items-start gap-4 p-3.5 rounded-xl bg-surface-container-low/50 border border-surface-container">
              <div class="w-8 h-8 rounded-full bg-surface-container-high text-outline flex items-center justify-center shrink-0">
                <span class="material-symbols-outlined text-sm">flag</span>
              </div>
              <div class="flex flex-col flex-1">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-medium text-on-surface">Principal AI Enterprise Fellow (L7)</span>
                  <span class="text-[10px] text-outline">Horizon: 2025–2026</span>
                </div>
                <p class="text-[11px] text-outline mt-0.5">Enterprise platform leadership & multi-domain AI strategy.</p>
              </div>
            </div>
          </div>

          <div class="flex items-center justify-between pt-2 border-t border-surface-container">
            <span class="text-xs text-outline">Recommended Sponsor: <strong>Rachel Vance</strong></span>
            <div class="flex items-center gap-2">
              <button id="cancelCareerModalBtn" class="px-4 py-2 rounded-lg text-xs font-semibold text-on-surface hover:bg-surface-container transition-colors">
                Close
              </button>
              <button id="applyMobilityBtn" class="px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-semibold transition-all shadow-xs">
                Express 1-Click Mobility Interest
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  `;
}

// Stateful conversation context for multi-turn n8n sessions
let currentConversationId = 'career-assistant-session';
let conversationHistory = [];
let isRequestInProgress = false;

// Interactive Event Binder for the AI Career Assistant View
export function initAiCareerAssistantEvents() {
  const container = document.getElementById('aiCareerAssistantView');
  if (!container) return;

  const chatFeed = document.getElementById('chatFeedContainer');
  const dynamicFeed = document.getElementById('dynamicMessagesFeed');
  const typingIndicator = document.getElementById('aiTypingIndicator');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatSendBtn = document.getElementById('chatSendBtn');
  const newChatBtn = document.getElementById('newChatBtn');
  const chatMenuBtn = document.getElementById('chatMenuBtn');
  const chatMenuDropdown = document.getElementById('chatMenuDropdown');
  const chatAttachBtn = document.getElementById('chatAttachBtn');
  const hiddenChatFileInput = document.getElementById('hiddenChatFileInput');
  const chatVoiceBtn = document.getElementById('chatVoiceBtn');

  // Modals
  const learningPlanModal = document.getElementById('learningPlanModal');
  const careerPathModal = document.getElementById('careerPathModal');

  const scrollToBottom = () => {
    if (chatFeed) {
      chatFeed.scrollTo({ top: chatFeed.scrollHeight, behavior: 'smooth' });
    }
  };

  // Helper to open/close modal
  const toggleModal = (modal, show) => {
    if (!modal) return;
    if (show) {
      modal.classList.remove('hidden');
    } else {
      modal.classList.add('hidden');
    }
  };

  // Bind Build Learning Plan buttons (including dynamically created ones)
  document.addEventListener('click', (e) => {
    if (e.target.closest('.build-learning-plan-btn')) {
      toggleModal(learningPlanModal, true);
    }
    if (e.target.closest('#viewCareerPathBtn')) {
      toggleModal(careerPathModal, true);
    }
  });

  // Close Modals
  document.getElementById('closeLearningModalBtn')?.addEventListener('click', () => toggleModal(learningPlanModal, false));
  document.getElementById('cancelLearningModalBtn')?.addEventListener('click', () => toggleModal(learningPlanModal, false));
  document.getElementById('enrollPlanBtn')?.addEventListener('click', () => {
    toggleModal(learningPlanModal, false);
    appendAiMessage(`🎉 **Enrolled in Senior AI Track!**\n\nYour 40-hour curriculum has been added to your TalentPulse Learning dashboard. Stage 1: *MLOps & Production Model Deployment* is now available.`);
  });

  document.getElementById('closeCareerModalBtn')?.addEventListener('click', () => toggleModal(careerPathModal, false));
  document.getElementById('cancelCareerModalBtn')?.addEventListener('click', () => toggleModal(careerPathModal, false));
  document.getElementById('applyMobilityBtn')?.addEventListener('click', () => {
    toggleModal(careerPathModal, false);
    appendAiMessage(`✅ **1-Click Mobility Interest Recorded!**\n\nYour profile has been forwarded to hiring manager Rachel Vance (VP Engineering) for Requisition #ENG-9421 (*Staff AI Solutions Architect*).`);
  });

  // Dropdown Menu Toggle
  chatMenuBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    chatMenuDropdown?.classList.toggle('hidden');
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#chatMenuBtn') && !e.target.closest('#chatMenuDropdown')) {
      chatMenuDropdown?.classList.add('hidden');
    }
  });

  document.getElementById('menuClearChat')?.addEventListener('click', () => {
    chatMenuDropdown?.classList.add('hidden');
    resetConversation();
  });

  document.getElementById('menuExportChat')?.addEventListener('click', () => {
    chatMenuDropdown?.classList.add('hidden');
    appendAiMessage(`📄 **Career Copilot Transcript Exported**\n\nA formatted summary of your career guidance session has been saved to your TalentPulse documents.`);
  });

  document.getElementById('menuPromptLibrary')?.addEventListener('click', () => {
    chatMenuDropdown?.classList.add('hidden');
    if (chatInput) {
      chatInput.value = "Analyze my readiness for Staff AI Architect";
      chatInput.focus();
    }
  });

  // File Attachment
  chatAttachBtn?.addEventListener('click', () => {
    hiddenChatFileInput?.click();
  });

  hiddenChatFileInput?.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
      appendUserMessage(`Attached document: ${file.name}`);
      showTyping(true);
      setTimeout(() => {
        showTyping(false);
        appendAiMessage(`📎 **Document Analyzed: ${file.name}**\n\nI have parsed the attached artifact. Relevant skill credentials and performance benchmarks have been integrated with your TalentPulse active profile.`);
      }, 900);
    }
  });

  // Voice Dictation Simulation
  let isListening = false;
  chatVoiceBtn?.addEventListener('click', () => {
    isListening = !isListening;
    const voiceIcon = document.getElementById('voiceIcon');
    if (isListening) {
      voiceIcon.classList.add('text-error', 'animate-pulse');
      chatInput.placeholder = "Listening... speak your inquiry";
      setTimeout(() => {
        if (isListening) {
          chatInput.value = "What internal positions have the highest salary range for my skill profile?";
          voiceIcon.classList.remove('text-error', 'animate-pulse');
          chatInput.placeholder = "Ask anything about your career, skills, opportunities, or learning...";
          isListening = false;
        }
      }, 2500);
    } else {
      voiceIcon.classList.remove('text-error', 'animate-pulse');
      chatInput.placeholder = "Ask anything about your career, skills, opportunities, or learning...";
    }
  });

  // New Chat Reset Action
  const resetConversation = () => {
    currentConversationId = `career-assistant-session-${Date.now()}`;
    conversationHistory = [];
    isRequestInProgress = false;

    if (dynamicFeed) dynamicFeed.innerHTML = '';
    if (chatInput) {
      chatInput.value = '';
      chatInput.disabled = false;
    }
    if (chatSendBtn) {
      chatSendBtn.disabled = false;
    }
    showTyping(false);
    scrollToBottom();
  };

  newChatBtn?.addEventListener('click', () => {
    resetConversation();
  });

  // Typing indicator toggler
  const showTyping = (show) => {
    if (!typingIndicator) return;
    if (show) {
      typingIndicator.classList.remove('hidden');
      typingIndicator.classList.add('flex');
    } else {
      typingIndicator.classList.add('hidden');
      typingIndicator.classList.remove('flex');
    }
    scrollToBottom();
  };

  const appendUserMessage = (text) => {
    if (!dynamicFeed) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userDiv = document.createElement('div');
    userDiv.className = 'flex items-start gap-3 justify-end animate-fade-in';
    userDiv.innerHTML = `
      <div class="max-w-xl bg-surface-container-low text-on-surface p-4 rounded-2xl rounded-tr-sm border border-surface-container shadow-2xs">
        <div class="flex items-center justify-between gap-4 mb-1.5">
          <span class="text-xs font-bold text-primary">Alex Mercer</span>
          <span class="text-[10px] text-outline">${timeString}</span>
        </div>
        <p class="text-xs text-on-surface leading-relaxed font-medium">
          ${escapeHtml(text)}
        </p>
      </div>
      <img 
        src="${userProfile.avatar}" 
        alt="Alex Mercer" 
        class="w-8 h-8 rounded-full object-cover shrink-0 border border-white shadow-xs mt-0.5"
      />
    `;
    dynamicFeed.appendChild(userDiv);
    scrollToBottom();
  };

  const appendAiMessage = (htmlOrText, hasAction = false) => {
    if (!dynamicFeed) return;
    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const aiDiv = document.createElement('div');
    aiDiv.className = 'flex items-start gap-3.5 animate-fade-in';

    const formattedContent = formatAiResponse(htmlOrText);

    aiDiv.innerHTML = `
      <div class="w-8 h-8 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0 shadow-xs mt-0.5">
        <span class="material-symbols-outlined text-base text-secondary">smart_toy</span>
      </div>
      <div class="flex-1 max-w-3xl flex flex-col gap-3">
        <div class="bg-white rounded-2xl rounded-tl-sm p-4 border border-surface-container shadow-xs text-xs text-on-surface flex flex-col gap-3">
          <div class="flex items-center justify-between gap-2 pb-2 border-b border-surface-container">
            <div class="flex items-center gap-2">
              <span class="text-xs font-bold text-on-surface">TalentPulse Career Copilot</span>
              <span class="text-[10px] text-outline">• ${timeString}</span>
            </div>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">
              <span class="material-symbols-outlined text-xs text-secondary">auto_awesome</span>
              <span>AI-generated insight</span>
            </div>
          </div>

          <div class="text-xs text-on-surface leading-relaxed space-y-2.5">
            ${formattedContent}
          </div>

          ${hasAction ? `
            <div class="pt-2 border-t border-surface-container flex justify-end">
              <button class="build-learning-plan-btn flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer">
                <span>Build Learning Plan</span>
                <span class="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          ` : ''}
        </div>
      </div>
    `;
    dynamicFeed.appendChild(aiDiv);
    scrollToBottom();
  };

  // Main Query Handler connecting to n8n backend
  const handleQuery = async (queryText) => {
    const text = (queryText || '').trim();
    if (!text || isRequestInProgress) return;

    isRequestInProgress = true;

    // 1. Clear input & disable controls while request is running
    if (chatInput) {
      chatInput.value = '';
      chatInput.disabled = true;
    }
    if (chatSendBtn) {
      chatSendBtn.disabled = true;
    }

    // 2. Display user message immediately in chat
    appendUserMessage(text);
    conversationHistory.push({ role: 'user', content: text });

    // 3. Show AI typing indicator ("TalentPulse AI is thinking...")
    showTyping(true);

    // 4. Employee context (Default: EMP001 / Alex Mercer)
    const currentEmp = {
      id: (store.auth?.user?.id && store.auth.user.id !== 'EMP-8842') ? store.auth.user.id : 'EMP001',
      name: store.auth?.user?.name || 'Alex Mercer',
      role: store.auth?.user?.role || 'Principal Analyst',
      department: store.auth?.user?.department || 'People Analytics & Strategy'
    };

    try {
      // 5. POST to real n8n webhook via centralized API service
      const result = await sendCareerAssistantMessage({
        message: text,
        employee: currentEmp,
        conversationId: currentConversationId,
        conversationHistory: conversationHistory,
        context: {
          page: 'ai-career-assistant'
        }
      });

      // 6. Remove typing indicator
      showTyping(false);

      // 7. Parse and display result
      if (result.success && result.text) {
        const hasActionTrigger = 
          result.text.toLowerCase().includes('learning plan') || 
          result.text.toLowerCase().includes('roadmap') ||
          result.text.toLowerCase().includes('enroll');

        appendAiMessage(result.text, hasActionTrigger);
        conversationHistory.push({ role: 'assistant', content: result.text });
      } else {
        // Clean assistant error message
        const errorMsg = result.message || "I couldn't connect to TalentPulse AI right now. Please try again.";
        appendAiMessage(errorMsg, false);
      }
    } catch (err) {
      console.error("Career Assistant dispatch error:", err);
      showTyping(false);
      appendAiMessage("I couldn't connect to TalentPulse AI right now. Please try again.", false);
    } finally {
      // 8. Re-enable controls and focus input
      isRequestInProgress = false;
      if (chatInput) {
        chatInput.disabled = false;
        chatInput.focus();
      }
      if (chatSendBtn) {
        chatSendBtn.disabled = false;
      }
      scrollToBottom();
    }
  };

  // Form submit handler
  chatForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    handleQuery(chatInput?.value);
  });

  // Quick Action Buttons click listeners (all routed to real n8n API)
  container.querySelectorAll('.quick-action-card').forEach(card => {
    card.addEventListener('click', () => {
      const prompt = card.dataset.prompt;
      if (prompt) handleQuery(prompt);
    });
  });
}

// Utility: simple HTML escaping
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/[&<>"']/g, (m) => {
    switch (m) {
      case '&': return '&amp;';
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '"': return '&quot;';
      case "'": return '&#039;';
      default: return m;
    }
  });
}

// Utility: format markdown-like text to clean, beautiful enterprise HTML
function formatAiResponse(text) {
  if (!text) return '';
  
  // Escape HTML first to prevent injection
  let formatted = escapeHtml(text);

  // Bold & Italic
  formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');

  // Headers
  formatted = formatted.replace(/^### (.*$)/gim, '<h4 class="font-bold text-on-surface text-xs mt-2.5 mb-1">$1</h4>');
  formatted = formatted.replace(/^## (.*$)/gim, '<h3 class="font-bold text-on-surface text-sm mt-3 mb-1.5">$1</h3>');

  // Bullet items
  formatted = formatted.replace(/^• (.*$)/gim, '<li class="flex items-start gap-1.5 ml-1 mt-1"><span class="material-symbols-outlined text-xs text-primary mt-0.5 shrink-0">check_circle</span><span>$1</span></li>');
  formatted = formatted.replace(/^- (.*$)/gim, '<li class="flex items-start gap-1.5 ml-1 mt-1"><span class="material-symbols-outlined text-xs text-secondary mt-0.5 shrink-0">arrow_right</span><span>$1</span></li>');

  // Code snippets
  formatted = formatted.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-container text-primary font-mono text-[11px]">$1</code>');

  // Line breaks to paragraphs
  return formatted.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>');
}
