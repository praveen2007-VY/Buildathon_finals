// Screen 2: AI Career Assistant View matching Stitch specs

import { targetOpportunity } from '../data.js';

export function renderAiCareerAssistantView() {
  return `
    <div class="flex flex-col w-full gap-6 animate-fade-in">
      <!-- Top Title & Engine Status Header -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-1">
        <div class="flex flex-col">
          <div class="flex items-center gap-2 mb-1">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed text-[11px] uppercase tracking-wider font-semibold">
              <span class="material-symbols-outlined text-sm text-secondary">psychology_alt</span>
              Algorithmic Advisory
            </span>
            <span class="text-outline">•</span>
            <span class="text-xs text-outline font-medium">Active Engine: TalentPulse Llama-3-Enterprise</span>
          </div>
          <h1 class="font-display text-2xl font-bold text-on-surface tracking-tight">AI Career Copilot & Mobility Assistant</h1>
          <p class="text-xs text-on-surface-variant max-w-2xl">Personalized intelligence on role progression, skill development pathways, and internal job matches.</p>
        </div>

        <div class="flex items-center gap-3 px-4 py-2 rounded-xl bg-white shadow-xs border border-surface-container self-start md:self-auto">
          <div class="relative flex items-center justify-center">
            <span class="w-2.5 h-2.5 rounded-full bg-primary-container"></span>
            <span class="w-2.5 h-2.5 rounded-full bg-primary-container absolute animate-ping opacity-75"></span>
          </div>
          <div class="flex flex-col">
            <span class="text-[10px] text-outline leading-none uppercase tracking-wide">Target Profile</span>
            <span class="text-xs text-on-surface font-bold leading-tight">Alex Mercer (Principal Track)</span>
          </div>
          <div class="h-6 w-px bg-surface-container ml-1"></div>
          <button id="switchContextBtn" class="p-1 rounded-lg text-outline hover:text-on-surface hover:bg-surface-container transition-colors" title="Switch Context">
            <span class="material-symbols-outlined text-lg">swap_horiz</span>
          </button>
        </div>
      </div>

      <!-- Main Layout Grid (Prompt Library 3 cols | Chat Feed 6 cols | Opportunity Blueprint 3 cols) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- LEFT ASIDE: Prompt Library (3 Cols) -->
        <aside class="lg:col-span-3 flex flex-col gap-4">
          <div class="bg-white rounded-2xl p-4 shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-center justify-between">
              <span class="text-[11px] uppercase tracking-wider text-outline font-semibold">Prompt Library</span>
              <button id="newThreadBtn" class="flex items-center gap-1 text-[11px] text-primary font-semibold hover:underline">
                <span class="material-symbols-outlined text-xs">add</span> New Thread
              </button>
            </div>

            <!-- Library Search -->
            <div class="relative">
              <span class="material-symbols-outlined absolute left-2.5 top-2.5 text-outline text-base">search</span>
              <input type="text" placeholder="Search prompts & history..." class="w-full h-9 pl-8 pr-3 text-xs rounded-lg bg-surface-container-low text-on-surface placeholder:text-outline focus:outline-none"/>
            </div>

            <div class="flex flex-wrap gap-1.5">
              <button class="px-2.5 py-1 rounded-full text-[11px] bg-primary-fixed text-on-primary-fixed font-semibold">Role Matching</button>
              <button class="px-2.5 py-1 rounded-full text-[11px] bg-surface-container text-on-surface-variant hover:bg-surface-container-high">Skill Gaps</button>
              <button class="px-2.5 py-1 rounded-full text-[11px] bg-surface-container text-on-surface-variant hover:bg-surface-container-high">Promotion</button>
            </div>

            <!-- Curated Inquiries -->
            <div class="flex flex-col gap-1.5 pt-2">
              <span class="text-[10px] text-outline uppercase tracking-wider font-semibold mb-1">Curated Inquiries</span>
              
              <button class="curated-prompt-btn w-full text-left p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">auto_awesome</span>
                  <p class="text-xs text-on-surface group-hover:text-primary transition-colors">What roles match my current verified skills with >90% affinity?</p>
                </div>
              </button>

              <button class="curated-prompt-btn w-full text-left p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">auto_awesome</span>
                  <p class="text-xs text-on-surface group-hover:text-primary transition-colors">What 2 critical skills should I develop to reach Staff Director?</p>
                </div>
              </button>

              <button class="curated-prompt-btn w-full text-left p-2.5 rounded-lg bg-surface-container-low hover:bg-surface-container transition-all group">
                <div class="flex items-start gap-2">
                  <span class="material-symbols-outlined text-primary-container text-base shrink-0 mt-0.5">auto_awesome</span>
                  <p class="text-xs text-on-surface group-hover:text-primary transition-colors">Analyze my skill gap against Senior Solutions Architect opening</p>
                </div>
              </button>
            </div>
          </div>

          <div class="bg-secondary-fixed/30 rounded-2xl p-4 border border-secondary-fixed/50 flex flex-col gap-2">
            <div class="flex items-center gap-2 text-on-secondary-fixed">
              <span class="material-symbols-outlined text-base">shield_with_heart</span>
              <span class="text-xs font-semibold">Career Privacy Guarantee</span>
            </div>
            <p class="text-[11px] text-on-surface-variant leading-relaxed">Your inquiries and exploratory prompts are strictly private and unshared with management until you voluntarily submit an application.</p>
          </div>
        </aside>

        <!-- CENTER: Chat Conversation Workspace (6 Cols) -->
        <section class="lg:col-span-6 flex flex-col gap-4">
          <div class="bg-white rounded-2xl p-6 shadow-xs border border-surface-container flex flex-col gap-6 min-h-[620px] justify-between">
            <!-- Messages Scroll Area -->
            <div class="flex flex-col gap-6" id="chatFeedContainer">
              <!-- User Message -->
              <div class="flex items-start gap-3 justify-end">
                <div class="max-w-xl bg-surface-container-low text-on-surface p-4 rounded-2xl rounded-tr-none border border-surface-container">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-xs font-semibold text-primary">Alex Mercer</span>
                    <span class="text-[10px] text-outline">10:42 AM</span>
                  </div>
                  <p class="text-xs text-on-surface leading-relaxed">
                    Analyze my readiness for the upcoming <span class="font-semibold text-primary">"Staff AI Solutions Architect"</span> internal opening and outline what I need to complete.
                  </p>
                </div>
                <img src="${userProfile.avatar}" class="w-8 h-8 rounded-full object-cover shrink-0 shadow-xs"/>
              </div>

              <!-- AI Agent Response -->
              <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed shrink-0 shadow-xs">
                  <span class="material-symbols-outlined text-lg">smart_toy</span>
                </div>

                <div class="flex-1 bg-white rounded-2xl border border-surface-container shadow-sm p-4 flex flex-col gap-4">
                  <!-- AI Header Card -->
                  <div class="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-3 border-b border-surface-container">
                    <div class="flex items-center gap-2">
                      <span class="material-symbols-outlined text-secondary text-base">psychology</span>
                      <div class="flex flex-col">
                        <span class="text-xs font-bold text-on-surface">TalentPulse AI Reasoning Engine</span>
                        <span class="text-[10px] text-outline">Matched against Requisition #ENG-9421</span>
                      </div>
                    </div>
                    <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed">
                      <span class="w-2 h-2 rounded-full bg-primary"></span>
                      <span class="text-[11px] font-bold">91% Strong Match (Readiness: High)</span>
                    </div>
                  </div>

                  <p class="text-xs text-on-surface-variant leading-relaxed">
                    Based on your current capability profile across <strong class="text-on-surface">14 verified enterprise capabilities</strong>, here is the synthesis of your structural affinity for the Staff AI role opening on October 15th:
                  </p>

                  <!-- Evidence Breakdown -->
                  <div class="flex flex-col gap-2 p-3.5 bg-surface-container-low/60 rounded-xl border border-surface-container">
                    <div class="flex items-center gap-1.5 text-primary font-semibold text-xs">
                      <span class="material-symbols-outlined text-base">verified</span>
                      <span class="uppercase tracking-wide text-[10px]">Why you're a great fit (Evidence Breakdown)</span>
                    </div>
                    <ul class="flex flex-col gap-1.5 mt-1 text-xs text-on-surface">
                      <li class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-primary-container text-base shrink-0">check_circle</span>
                        <span><strong>4+ years</strong> leading high-throughput cloud architecture across Global Supply platforms.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-primary-container text-base shrink-0">check_circle</span>
                        <span><strong>Verified High Proficiency</strong> in Python, LLM Orchestration, and Distributed Systems.</span>
                      </li>
                      <li class="flex items-start gap-2">
                        <span class="material-symbols-outlined text-primary-container text-base shrink-0">check_circle</span>
                        <span><strong>98% Peer Collaboration Score</strong> recorded across last three delivery cycles.</span>
                      </li>
                    </ul>
                  </div>

                  <!-- Growth Gaps -->
                  <div class="flex flex-col gap-2 p-3.5 bg-error-container/20 rounded-xl border border-error-container/40">
                    <div class="flex items-center gap-1.5 text-error font-semibold text-xs">
                      <span class="material-symbols-outlined text-base">warning</span>
                      <span class="uppercase tracking-wide text-[10px]">Identified Growth Gaps (Remediation Plan)</span>
                    </div>
                    <div class="flex flex-col gap-2 mt-1">
                      <div class="flex items-center justify-between p-2.5 rounded-lg bg-white shadow-xs border border-surface-container">
                        <div class="flex items-center gap-2.5">
                          <span class="material-symbols-outlined text-on-error-container text-base">gavel</span>
                          <div class="flex flex-col">
                            <span class="text-xs text-on-surface font-semibold">SOC2 Compliance Architecture</span>
                            <span class="text-[10px] text-outline">15 hrs self-paced fast-track course</span>
                          </div>
                        </div>
                        <span class="px-2 py-0.5 text-[10px] font-semibold rounded bg-surface-container-high text-on-surface">Gap: 18%</span>
                      </div>
                    </div>
                  </div>

                  <!-- Autonomous Direct Actions -->
                  <div class="flex flex-col gap-2 pt-1">
                    <span class="text-[10px] text-outline uppercase tracking-wider font-semibold">Autonomous Direct Actions</span>
                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <button id="expressInterestBtn" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-primary-container text-white text-xs font-semibold hover:bg-primary transition-all shadow-xs">
                        <span class="material-symbols-outlined text-base">bolt</span>
                        <span class="truncate">1-Click Express Interest</span>
                      </button>
                      <button id="enrollCourseBtn" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-variant transition-colors">
                        <span class="material-symbols-outlined text-base text-primary">school</span>
                        <span class="truncate">Enroll SOC2 Course</span>
                      </button>
                      <button id="downloadCvBtn" class="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-surface-container-high text-on-surface text-xs font-medium hover:bg-surface-variant transition-colors">
                        <span class="material-symbols-outlined text-base text-secondary">file_download</span>
                        <span class="truncate">Tailored Mobility CV</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Input Controls Area -->
            <div class="flex flex-col gap-2 pt-4 border-t border-surface-container">
              <div class="flex items-center gap-2 overflow-x-auto pb-1">
                <span class="text-[10px] text-outline uppercase font-semibold mr-1 shrink-0">Quick Prompts:</span>
                <button class="quick-pill-btn px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] hover:bg-surface-container-high shrink-0">Compare with Director of AI</button>
                <button class="quick-pill-btn px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] hover:bg-surface-container-high shrink-0">Show hiring team roadmap</button>
                <button class="quick-pill-btn px-2.5 py-1 rounded-full bg-surface-container text-on-surface-variant text-[11px] hover:bg-surface-container-high shrink-0">Simulate interview questions</button>
              </div>

              <div class="relative flex items-center bg-surface-container-low rounded-xl p-1 border border-surface-container">
                <button class="p-2 text-outline hover:text-on-surface transition-colors" title="Attach artifact">
                  <span class="material-symbols-outlined text-lg">attach_file</span>
                </button>
                <input type="text" id="aiMainChatInput" class="w-full h-10 bg-transparent px-2 text-xs text-on-surface placeholder:text-outline focus:outline-none" placeholder="Ask TalentPulse AI about promotion timing, team transfers, or compensation parity..."/>
                <button id="aiMainSendBtn" class="flex items-center justify-center w-9 h-9 rounded-lg bg-primary-container text-white hover:bg-primary transition-all shadow-xs shrink-0">
                  <span class="material-symbols-outlined text-base">send</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- RIGHT ASIDE: Target Opportunity Blueprint (3 Cols) -->
        <aside class="lg:col-span-3 flex flex-col gap-4">
          <div class="bg-white rounded-2xl p-4 shadow-xs border border-surface-container flex flex-col gap-4">
            <div class="flex items-start justify-between">
              <div class="flex flex-col">
                <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Target Opportunity Blueprint</span>
                <h2 class="font-display text-base text-on-surface font-bold leading-snug">${targetOpportunity.title}</h2>
              </div>
              <span class="px-2 py-0.5 rounded bg-secondary-fixed text-on-secondary-fixed text-[10px] font-semibold">${targetOpportunity.reqId}</span>
            </div>

            <div class="flex flex-col gap-1.5 text-xs text-on-surface-variant bg-surface-container-low p-3 rounded-xl border border-surface-container">
              <div class="flex items-center justify-between">
                <span class="text-outline">Band Level:</span>
                <span class="font-medium text-on-surface">${targetOpportunity.band}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-outline">Comp Range:</span>
                <span class="font-medium text-on-surface">${targetOpportunity.compRange}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="text-outline">Location:</span>
                <span class="font-medium text-on-surface">${targetOpportunity.location}</span>
              </div>
            </div>

            <!-- Mentors List -->
            <div class="flex flex-col gap-2">
              <span class="text-[10px] uppercase tracking-wider text-outline font-semibold">Recommended Mentors</span>
              <div class="flex flex-col gap-2">
                ${targetOpportunity.mentors.map(m => `
                  <div class="flex items-center justify-between p-2 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors">
                    <div class="flex items-center gap-2">
                      <img src="${m.avatar}" class="w-7 h-7 rounded-full object-cover"/>
                      <div class="flex flex-col">
                        <span class="text-xs font-semibold text-on-surface leading-tight">${m.name}</span>
                        <span class="text-[10px] text-outline">${m.role}</span>
                      </div>
                    </div>
                    <button class="p-1 rounded text-primary hover:bg-primary-fixed transition-colors" title="Chat">
                      <span class="material-symbols-outlined text-sm">chat</span>
                    </button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
}
